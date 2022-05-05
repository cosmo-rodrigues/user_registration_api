import bcryptjs from "bcryptjs";
import { httpStatusCode } from "../constant/httpStatusCode";
import { UserModel } from "../database/models/UserModel";
import { HttpException } from "../utils/HttpException";
import { tokenGenerate } from "../auth/tokenGenerator";
import { AddressModel } from "../database/models/AddressModel";
import { addressFieldsValidate } from "../validation/address";
import { userValidations } from "../validation/user";

interface IAdress {
  country: string;
  state: string;
  county: string;
  zipCode: string;
  street: string;
  number: string;
  complement: string;
}

export const createUser = async (
  name: string,
  email: string,
  password: string,
  cpf: number,
  pis: number,
  address: IAdress
) => {
  const emailAlreadyRegistered = await UserModel.findOne({ where: { email } });

  if (emailAlreadyRegistered) {
    throw new HttpException(httpStatusCode.CONFLICT, "Email já cadastrado!");
  }

  const cpfAlreadyRegistered = await UserModel.findOne({ where: { cpf } });

  if (cpfAlreadyRegistered) {
    throw new HttpException(httpStatusCode.CONFLICT, "CPF já cadastrado!");
  }

  const pisAlreadyRegistered = await UserModel.findOne({ where: { pis } });

  if (pisAlreadyRegistered) {
    throw new HttpException(httpStatusCode.CONFLICT, "PIS já cadastrado!");
  }

  const { country, state, county, zipCode, street, number, complement } =
    address;

  function roleInjection() {
    const getRoleByEmailDomain = email.split("@")[1];
    const userRole =
      getRoleByEmailDomain === "register.admin" ? "admin" : "user";

    return userRole;
  }

  userValidations(
    {
      name,
      email,
      password,
      cpf,
      pis,
    },
    true
  );
  addressFieldsValidate(address);

  // @ts-ignore
  const { id: addressId } = await AddressModel.create({
    country,
    state,
    county,
    zipCode,
    street,
    number,
    complement,
  });

  const salt = bcryptjs.genSaltSync(8);
  const passwordHash = bcryptjs.hashSync(password, salt);

  // @ts-ignore
  const { id } = await UserModel.create({
    name,
    email,
    cpf,
    pis,
    password: passwordHash,
    role: roleInjection(),
    addressId,
  });

  const user = await getUserById(id);

  const token = tokenGenerate({ email, id });
  return { token, user };
};

export const getAll = async (page: number, size: number) => {
  const users = await UserModel.findAndCountAll({
    limit: size,
    offset: page,
    include: [{ model: AddressModel, as: "address" }],
    attributes: { exclude: ["password"] },
  });

  return {
    content: users.rows,
    totalPages: Math.ceil(users.count / size),
  };
};

export const getUserById = async (id: number) => {
  const user = await UserModel.findOne({
    where: { id },
    include: [{ model: AddressModel, as: "address" }],
    attributes: { exclude: ["password"] },
  });
  if (!user)
    throw new HttpException(
      httpStatusCode.NOT_FOUND,
      "Usuário não encontrado!"
    );
  return user;
};

export const deleteUser = async (id: number) => {
  // @ts-ignore
  await getUserById(id);

  await UserModel.destroy({ where: { id } });
  await AddressModel.destroy({ where: { id } });
};

export const updateUser = async (
  id: number,
  name: string,
  email: string,
  password: string,
  cpf: number,
  pis: number,
  address: IAdress
) => {
  const { country, state, county, zipCode, street, number, complement } =
    address;

  userValidations(
    {
      name,
      email,
      password,
      cpf,
      pis,
    },
    false
  );
  addressFieldsValidate(address);

  const updatedUser = await UserModel.update(
    { name, email, cpf, pis },
    { where: { email } }
  );
  await AddressModel.update(
    { country, state, county, zipCode, street, number, complement },
    { where: { id } }
  );

  if (updatedUser) {
    return `Dados do usuário atualizados com sucesso!`;
  }
};
