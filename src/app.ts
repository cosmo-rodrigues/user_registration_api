import "../passport";
import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import logger from "morgan";
import passport from "passport";
import swaggerUi from "swagger-ui-express";
import cookieSession from "cookie-session";

import { handleError } from "./middleware/handleError";
import { router } from "./routes/router";

import swaggerDocs from "../swagger.json";

dotenv.config();

export const app = express();

app.use(
  cookieSession({
    name: "social_session",
    keys: [process.env.KEY_DOMAIN],
    maxAge: 48 * 60 * 60 * 1000,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "POST,GET,PUT,DELETE",
    credentials: true,
  })
);

app.use(json());

app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(router);

app.use(handleError);
app.use(logger("dev"));
