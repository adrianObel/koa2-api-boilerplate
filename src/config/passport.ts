import passport from "koa-passport";
import User from "../models/users";
import { Strategy } from "passport-local";

passport.serializeUser((user: any, done: any) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done: any) => {
  try {
    const user = await User.findById(id, "-password");
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(
  "local",
  new Strategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username: string, password: string, done: (err: any, id?: any) => void) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          return done(null, false);
        }

        try {
          const isMatch = await user.validatePassword(password);

          if (!isMatch) {
            return done(null, false);
          }

          done(null, user);
        } catch (err) {
          done(err);
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);
