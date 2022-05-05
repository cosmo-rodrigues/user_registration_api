import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import * as loginController from "../controller/login";

dotenv.config();

export const login = express.Router();

login.post("/auth", loginController.authorization);

login.get("/login/success", (request, response) => {
  if (request.user) {
    response.status(200).json({
      success: true,
      message: "successfull",
      user: request.user,
      //   cookies: request.cookies
    });
  }
});

login.get("/login/failed", (request, response) => {
  response.status(401).json({
    success: false,
    message: "failure",
  });
});

login.get("/logout", (request, response) => {
  request.logout();
  response.redirect(process.env.CLIENT_URL);
});

login.get("/google", passport.authenticate("google", { scope: ["profile"] }));

login.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

login.get("/github", passport.authenticate("github", { scope: ["profile"] }));

login.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

login.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["profile"] })
);

login.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);
