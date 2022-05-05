import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import GithubStrategy from "passport-github2";
import FacebookStrategy from "passport-facebook";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (_accessToken, _refreshToken, profile, callback) {
      return callback(null, profile);
    }
  )
);

passport.use(
  new GithubStrategy.Strategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    function (_accessToken, _refreshToken, profile, callback) {
      return callback(null, profile);
    }
  )
);

passport.use(
  new FacebookStrategy.Strategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    function (_accessToken, _refreshToken, profile, callback) {
      return callback(null, profile);
    }
  )
);

passport.serializeUser((user, callback) => {
  return callback(null, user);
});

passport.deserializeUser((user, callback) => {
  return callback(null, user);
});
