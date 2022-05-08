import express from "express";
import * as loginController from "../controller/login";

export const login = express.Router();

login.post("/", loginController.authorization);
login.post("/:docId", loginController.docAuthorization);
