// @ts-nocheck
import { UserModel } from "../database/models/UserModel";
import { tokenGenerate } from "../auth/tokenGenerator";
import { loginValidations } from "../validation/password";
import { AddressModel } from "../database/models/AddressModel";

export const login = async (email: string, password: string) => {
  await loginValidations(email, password);

  const user = await UserModel.findOne({
    where: { email },
    attributes: { exclude: ["password"] },
    include: [{ model: AddressModel, as: "address" }],
  });

  // @ts-ignore
  const token = tokenGenerate({ id: user.id, email });

  return { token, user };
};

export const loginWithCPF = async (
  cpf: string,
  password: string,
  docNumber: string
) => {
  await loginValidations(cpf, password, docNumber);

  const user = await UserModel.findOne({
    where: { cpf: +docNumber },
    attributes: { exclude: ["password"] },
    include: [{ model: AddressModel, as: "address" }],
  });

  // @ts-ignore
  const token = tokenGenerate({ id: user.id, email: user.email });

  return { token, user };
};

export const loginWithPIS = async (
  pis: string,
  password: string,
  docNumber: string
) => {
  await loginValidations(pis, password, docNumber);

  const user = await UserModel.findOne({
    where: { pis: +docNumber },
    attributes: { exclude: ["password"] },
    include: [{ model: AddressModel, as: "address" }],
  });

  // @ts-ignore
  const token = tokenGenerate({ id: user.id, email: user.email });

  return { token, user };
};
