import express from "express";
import * as userController from "../controller/user";

export const user = express.Router();

user.post("/", userController.create);

user.get("/", userController.getAll);

user.get("/:id", userController.getUserById);

user.delete("/:id", userController.deleteUser);
