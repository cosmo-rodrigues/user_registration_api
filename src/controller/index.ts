import { NextFunction, Request, Response } from "express";
import { httpStatusCode } from "../constant/httpStatusCode";
import * as userService from "../service";

export const create = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { name, email, cpf, pis } = request.body;
    const token = await userService.createUser(name, email, cpf, pis);
    response.json({ token }).send(httpStatusCode.CREATED);
  } catch (error) {
    return next(error);
  }
};

export const getAll = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const users = await userService.getAll();
    response.json({ users }).send(httpStatusCode.OK);
  } catch (error) {
    return next(error);
  }
};
