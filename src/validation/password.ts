import bcryptjs from "bcryptjs";

import { httpStatusCode } from "../constant/httpStatusCode";
import { UserModel } from "../database/models/UserModel";
import { HttpException } from "../utils/HttpException";

export async function loginValidations(
  credential: string,
  password: string,
  docNumber?: number
) {
  if (!password || typeof password !== "string")
    throw new HttpException(
      httpStatusCode.UNPROCESSABLE_ENTITY,
      "A senha é obrigatória!"
    );

  if (Number.isNaN(docNumber))
    throw new HttpException(
      httpStatusCode.UNPROCESSABLE_ENTITY,
      "Parâmetro inválido"
    );

  let user = {};

  switch (credential) {
    case "cpf":
      user = await UserModel.findOne({ where: { cpf: +docNumber } });
      break;
    case "pis":
      user = await UserModel.findOne({ where: { pis: +docNumber } });
      break;
    default:
      user = await UserModel.findOne({ where: { email: credential } });
      break;
  }

  // @ts-ignore
  if (!user)
    throw new HttpException(httpStatusCode.NOT_FOUND, "Usuário não encontrado");

  // @ts-ignore
  const checkPassword = bcryptjs.compareSync(password, user.password);

  if (!checkPassword) {
    throw new HttpException(
      httpStatusCode.UNPROCESSABLE_ENTITY,
      "Senha inválida!"
    );
  }
}
