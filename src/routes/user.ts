import express from "express";

export const user = express.Router();

user.post("/", async () => {
  console.log("User rout");
});

user.get("/", async () => {
  console.log("User rout");
});

user.get("/:id", async () => {
  console.log("user rout with id");
});

user.delete("/:id", async () => {
  console.log("user rout with id");
});
