import { NextFunction, Request, Response } from "express";
import { httpStatusCode } from "../constant/httpStatusCode";
import * as loginServices from "../service/login";

export const authorization = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = request.body;
    const login = await loginServices.login(email, password);

    response.json({ token: login }).sendStatus(httpStatusCode.OK);
  } catch (error) {
    next(error);
  }
  next();
};
