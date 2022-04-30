import { NextFunction, Request, Response } from "express";
import { HttpException } from "../utils/HttpException";

const DEFAULT_ERR = {
  status: 500,
  message: "Internal Server Error",
};

export const handleError = (
  error: HttpException,
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  const { status, message } = error;

  try {
    if (error instanceof HttpException)
      return response.status(status).json({ message });
  } catch (error) {
    return response
      .status(DEFAULT_ERR.status)
      .json({ message: DEFAULT_ERR.message });
  }
  return next();
};
