import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { NextFunction, Request, Response } from "express";
import { httpStatusCode } from "../constant/httpStatusCode";
import { HttpException } from "../utils/HttpException";

dotenv.config();

const secret = process.env.JWT_SECRET;
interface IUser {
  email: string;
  id: number;
}
interface IRequest extends Request {
  user: IUser;
}

export const tokenValidator = async (
  request: IRequest | jwt.JwtPayload,
  _response: Response,
  next: NextFunction
) => {
  try {
    const token = request.headers.authorization;

    if (!token)
      throw new HttpException(
        httpStatusCode.UNAUTHORIZED,
        "Você não está logado!"
      );

    const decoded = jwt.verify(token, secret, (error, decoded) => {
      if (error)
        throw new HttpException(
          httpStatusCode.UNAUTHORIZED,
          "Token expirado ou inválido!"
        );
      return decoded;
    });

    request.user = decoded;
  } catch (error) {
    next(error);
  }
  next();
};
