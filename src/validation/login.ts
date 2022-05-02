import { httpStatusCode } from "../constant/httpStatusCode";
import { UserModel } from "../database/models/UserModel";
import { HttpException } from "../utils/HttpException";

export async function loginValidation(email: string) {
  if (!email || typeof email !== "string")
    throw new HttpException(
      httpStatusCode.UNPROCESSABLE_ENTITY,
      "O email é obrigatório!"
    );

  const user = await UserModel.findOne({ where: { email } });

  if (!user) {
    throw new HttpException(
      httpStatusCode.NOT_FOUND,
      "Usuário não encontrado!"
    );
  }
}
