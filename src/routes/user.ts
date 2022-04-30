import express from "express";
import * as userController from "../controller";

export const user = express.Router();

user.post("/", userController.create);

user.get("/", userController.getAll);

user.get("/:id", async () => {
  console.log("user rout with id");
});

user.delete("/:id", async () => {
  console.log("user rout with id");
});
