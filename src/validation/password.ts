import bcrypt from "bcrypt";

import { httpStatusCode } from "../constant/httpStatusCode";
import { UserModel } from "../database/models/UserModel";
import { HttpException } from "../utils/HttpException";

export async function passwordValidation(password: string, email: string) {
  if (!password || typeof password)
    throw new HttpException(
      httpStatusCode.UNPROCESSABLE_ENTITY,
      "A senha é obrigatória!"
    );

  const user = await UserModel.findOne({ where: { email } });

  // @ts-ignore
  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    throw new HttpException(
      httpStatusCode.UNPROCESSABLE_ENTITY,
      "Senha inválida!"
    );
  }
}
