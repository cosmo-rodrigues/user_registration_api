import express from "express";
import dotenv from "dotenv";
import passport from "passport";

dotenv.config();

export const socialAuth = express.Router();

socialAuth.get("/login/success", (request, response) => {
  if (request.user) {
    response.status(200).json({
      success: true,
      message: "successfully",
      user: request.user,
      //   cookies: request.cookies
    });
  }
});

socialAuth.get("/login/failed", (request, response) => {
  response.status(401).json({
    success: false,
    message: "failure",
  });
});

socialAuth.get("/logout", (request, response) => {
  request.logout();
  response.redirect(process.env.CLIENT_URL);
});

socialAuth.get(
  "/google",
  passport.authenticate("google", { scope: ["profile"] })
);

socialAuth.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

socialAuth.get("/github", passport.authenticate("github", { scope: ["user"] }));

socialAuth.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

socialAuth.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["profile"] })
);

socialAuth.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);
