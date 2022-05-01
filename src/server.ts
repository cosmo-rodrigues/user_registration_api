import dotenv from "dotenv";
import { app } from "./app";
import { db } from "./database/db";

dotenv.config();

const PORT = process.env.PORT;

const server = app.listen(PORT, async () => {
  await db.sync();
  console.log(`Listen on ${PORT}`);
});

process.on("SIGINT", () => {
  server.close();
  console.log("App closed");
});
