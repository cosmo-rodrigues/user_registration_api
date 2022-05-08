import { NextFunction, Request, Response } from "express";
import { httpStatusCode } from "../constant/httpStatusCode";
import * as loginServices from "../service/login";

export const authorization = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const email = request.body.email;
    const password = request.body.password;

    const login = await loginServices.login(email, password);

    response.json({ ...login }).sendStatus(httpStatusCode.OK);
  } catch (error) {
    next(error);
  }
  next();
};

export const docAuthorization = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const loginRef = request.query.ref;
    const docNumber = request.params.docId;
    const password = request.body.password;

    if (loginRef === "cpf") {
      const cpf = loginRef;
      const login = await loginServices.loginWithCPF(cpf, password, docNumber);
      response.json({ ...login }).sendStatus(httpStatusCode.OK);
    }

    if (loginRef === "pis") {
      const pis = loginRef;
      const login = await loginServices.loginWithPIS(pis, password, docNumber);
      response.json({ ...login }).sendStatus(httpStatusCode.OK);
    }
  } catch (error) {
    next(error);
  }
  next();
};
