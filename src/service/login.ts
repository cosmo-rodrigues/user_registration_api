import { UserModel } from "../database/models/UserModel";
import { tokenGenerate } from "../auth/tokenGenerator";
import { loginValidation } from "../validation/login";
import { passwordValidation } from "../validation/password";

export const login = async (email: string, password: string) => {
  await passwordValidation(password, email);
  await loginValidation(email);

  // @ts-ignore
  const { id } = await UserModel.findOne({ where: { email } });

  const token = tokenGenerate({ id, email });

  return token;
};
