import * as express from "express";

export const login = express.Router();

login.post("/", async () => {
  console.log("Usuário logado");
});
