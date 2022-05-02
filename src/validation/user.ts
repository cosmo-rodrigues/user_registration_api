import { httpStatusCode } from "../constant/httpStatusCode";
import { HttpException } from "../utils/HttpException";

interface IUserInfos {
  name: string;
  email: string;
  password: string;
  cpf: number;
  pis: number;
}

const emailIsValid = (email: string) => {
  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;
  const emailIsValid = regexEmail.test(email);
  return emailIsValid;
};

export function userValidations(userInfos: IUserInfos) {
  const { name, email, password, cpf, pis } = userInfos;
  if (!name || typeof name !== "string" || name.length > 3) {
    throw new HttpException(
      httpStatusCode.UNPROCESSABLE_ENTITY,
      "Por favor, digite um nome válido com pelo menos 3 letras!"
    );
  }

  if (!email || typeof email !== "string" || !emailIsValid(email)) {
    throw new HttpException(
      httpStatusCode.UNPROCESSABLE_ENTITY,
      "Por favor digite um email de formato válido!"
    );
  }

  if (!password || typeof password !== "string") {
    throw new HttpException(httpStatusCode.UNPROCESSABLE_ENTITY, "");
  }

  if (!cpf || typeof cpf !== "number") {
    throw new HttpException(httpStatusCode.UNPROCESSABLE_ENTITY, "");
  }

  if (!pis || typeof pis !== "number") {
    throw new HttpException(httpStatusCode.UNPROCESSABLE_ENTITY, "");
  }
}
