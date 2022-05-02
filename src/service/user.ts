import bcrypt from "bcrypt";
import { httpStatusCode } from "../constant/httpStatusCode";
import { UserModel } from "../database/models/UserModel";
import { HttpException } from "../utils/HttpException";
import { tokenGenerate } from "../auth/tokenGenerator";
import { AddressModel } from "../database/models/AddressModel";

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
  cpf: number,
  pis: number,
  password: string,
  address: IAdress
) => {
  const alreadyRegisteredUser = await UserModel.findOne({ where: { email } });

  if (alreadyRegisteredUser) {
    throw new HttpException(httpStatusCode.CONFLICT, "Email já cadastrado!");
  }

  const { country, state, county, zipCode, street, number, complement } =
    address;

  function roleInjection() {
    const getRoleByEmailDomain = email.split("@")[1];
    const userRole =
      getRoleByEmailDomain === "register.admin" ? "admin" : "user";

    return userRole;
  }

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

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

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

  const token = tokenGenerate({ email, id });
  return token;
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
  await UserModel.destroy({ where: { id } });
  await AddressModel.destroy({ where: { id } });
};
