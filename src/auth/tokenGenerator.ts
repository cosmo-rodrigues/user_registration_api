import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET;

interface IPayload {
  email: string;
}

export const tokenGenerate = (payload: IPayload) => {
  const token = jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn: "3d",
  });
  return token;
};
