import { NextFunction, Request, Response } from "express";
import { httpStatusCode } from "../constant/httpStatusCode";
import { paginationFormat } from "../helper/pagination";
import * as userService from "../service/user";

export const create = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { name, email, cpf, pis, password, address } = request.body;
    const token = await userService.createUser(
      name,
      email,
      password,
      cpf,
      pis,
      address
    );
    response.json({ token }).sendStatus(httpStatusCode.CREATED);
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
    const currentPage = request.query.page;
    const requestSize = request.query.size;
    const { page, size } = paginationFormat(currentPage, requestSize);

    const users = await userService.getAll(page, size);

    response.json({ users }).sendStatus(httpStatusCode.OK);
  } catch (error) {
    return next(error);
  }
};

export const getUserById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = request.params.id;
    const user = await userService.getUserById(+id);

    response.json({ user }).sendStatus(httpStatusCode.OK);
  } catch (error) {
    return next(error);
  }
};

export const deleteUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = request.params.id;
    await userService.deleteUser(+id);
    response
      .json({ message: "Usuário deletado com sucesso!" })
      .sendStatus(httpStatusCode.OK);
  } catch (error) {
    return next(error);
  }
};

export const updateUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = request.params.id;
    const { name, email, cpf, pis, password, address } = request.body;
    const updatedUser = await userService.updateUser(
      +id,
      name,
      email,
      password,
      cpf,
      pis,
      address
    );
    response.json({ message: updatedUser }).sendStatus(httpStatusCode.CREATED);
  } catch (error) {
    return next(error);
  }
};
