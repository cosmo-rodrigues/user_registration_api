import express from "express";
import * as userController from "../controller/user";
import { tokenValidator } from "../middleware/tokenValidator";
import { userAccessInfo } from "../middleware/userAccessInfo";
import { userRole } from "../middleware/userRole";

export const user = express.Router();

user.post("/", userController.create);

user.get("/", tokenValidator, userRole, userController.getAll);

user.get("/:id", tokenValidator, userAccessInfo, userController.getUserById);

user.put("/:id", tokenValidator, userAccessInfo, userController.updateUser);

user.delete("/:id", tokenValidator, userAccessInfo, userController.deleteUser);
