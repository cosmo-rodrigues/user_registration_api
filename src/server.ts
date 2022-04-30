import { app } from "./app";
import { db } from "./database/db";

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, async () => {
  await db.sync();
  console.log(`Listen on ${PORT}`);
});

process.on("SIGINT", () => {
  server.close();
  console.log("App closed");
});
