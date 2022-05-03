import express, { json } from "express";
import cors from "cors";
import logger from "morgan";
import swaggerUi from "swagger-ui-express";

import { handleError } from "./middleware/handleError";
import { router } from "./routes/router";

import swaggerDocs from "../swagger.json";

export const app = express();

app.use(cors());
app.use(json());

app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(router);

app.use(handleError);
app.use(logger("dev"));
