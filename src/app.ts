import express, { json } from "express";
import cors from "cors";
import logger from "morgan";

import { handleError } from "./middleware/handleError";

import { router } from "./routes/router";

export const app = express();

app.use(cors());
app.use(json());

app.use(router);

app.use(handleError);
app.use(logger("dev"));
