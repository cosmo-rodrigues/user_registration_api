import express from "express";
import * as loginController from "../controller/login";

export const login = express.Router();

login.post("/auth", loginController.authorization);
