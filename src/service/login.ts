import { UserModel } from "../database/models/UserModel";
import { tokenGenerate } from "../auth/tokenGenerator";
import { emailValidation } from "../validation/email";
import { passwordValidation } from "../validation/password";

export const login = async (email: string, password: string) => {
  await passwordValidation(password, email);
  await emailValidation(email);

  // @ts-ignore
  const { id } = await UserModel.findOne({ where: { email } });

  const token = tokenGenerate({ id, email });

  return token;
};
