import express from "express";

import { login } from "./login";
import { socialAuth } from "./socialAuth";
import { user } from "./user";

export const router = express.Router();

router.use("/login", login);
router.use("/user", user);
router.use("/auth", socialAuth);
