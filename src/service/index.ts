import { httpStatusCode } from "../constant/httpStatusCode";
import { UserModel } from "../database/models/UserModel";
import { HttpException } from "../utils/HttpException";
import { tokenGenerate } from "../auth/tokenGenerator";

export const createUser = async (
  name: string,
  email: string,
  cpf: number,
  pis: number
) => {
  const alreadyRegisteredUser = await UserModel.findOne({ where: { email } });
  if (alreadyRegisteredUser) {
    throw new HttpException(httpStatusCode.CONFLICT, "User already registered");
  }
  await UserModel.create({
    name,
    email,
    cpf,
    pis,
  });
  const token = tokenGenerate({ email });
  return token;
};

export const getAll = async () => {
  const users = UserModel.findAll();
  return users;
};
