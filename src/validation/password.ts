import bcryptjs from "bcryptjs";

import { httpStatusCode } from "../constant/httpStatusCode";
import { UserModel } from "../database/models/UserModel";
import { HttpException } from "../utils/HttpException";

export async function passwordValidation(password: string, email: string) {
  if (!password || typeof password !== "string")
    throw new HttpException(
      httpStatusCode.UNPROCESSABLE_ENTITY,
      "A senha é obrigatória!"
    );

  const user = await UserModel.findOne({ where: { email } });

  // @ts-ignore
  const checkPassword = bcryptjs.compareSync(password, user.password);

  if (!checkPassword) {
    throw new HttpException(
      httpStatusCode.UNPROCESSABLE_ENTITY,
      "Senha inválida!"
    );
  }
}
