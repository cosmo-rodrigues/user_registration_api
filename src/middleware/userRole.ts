import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { httpStatusCode } from "../constant/httpStatusCode";
import { HttpException } from "../utils/HttpException";
import { UserModel } from "../database/models/UserModel";

interface IUser {
  email: string;
  id: number;
}
interface IRequest extends Request {
  user: IUser;
}

export const userRole = async (
  request: IRequest | jwt.JwtPayload,
  _response: Response,
  next: NextFunction
) => {
  try {
    const { email } = request.user;
    const user = await UserModel.findOne({ where: { email } });
    if (!user)
      throw new HttpException(
        httpStatusCode.NOT_FOUND,
        "Usuário não encontrado!"
      );

    // @ts-ignore
    if (user.role !== "admin") {
      throw new HttpException(
        httpStatusCode.UNAUTHORIZED,
        "Você não tem permissão para acessar este serviço!"
      );
    }
  } catch (error) {
    next(error);
  }
  next();
};
