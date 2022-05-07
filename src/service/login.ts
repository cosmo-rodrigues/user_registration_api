import { UserModel } from "../database/models/UserModel";
import { tokenGenerate } from "../auth/tokenGenerator";
import { loginValidation } from "../validation/login";
import { passwordValidation } from "../validation/password";
import { AddressModel } from "../database/models/AddressModel";

export const login = async (email: string, password: string) => {
  await passwordValidation(password, email);
  await loginValidation(email);

  const user = await UserModel.findOne({
    where: { email },
    attributes: { exclude: ["password"] },
    include: [{ model: AddressModel, as: "address" }],
  });

  // @ts-ignore
  const token = tokenGenerate({ id: user.id, email });

  return { token, user };
};
