const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");

const UserModel = require("../models/mongo/users.mongo");

const secretSignKey = process.env.SECRET_JWT_SIGN;

passport.use(
  "signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const user = await UserModel.create({ username, password });

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const user = await UserModel.findOne({ username, active: true });

        if (!user) {
          return done(null, false, { message: "Wrong Credentials" });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: "Wrong Credentials" });
        }

        const userData = {
          id: user._id,
          permissionlevel: user.permissionlevel,
        };

        return done(null, userData, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

const extractTokenFromCookie = (req) => {
  if (req && req.signedCookies.token) {
    return req.signedCookies.token;
  }
  return false;
};

const jwtOptions = {
  secretOrKey: secretSignKey,
  jwtFromRequest: extractTokenFromCookie,
};

passport.use(
  new JWTstrategy(jwtOptions, async (jwt_payload, done) => {
    try {
      const user = await UserModel.findOne({
        _id: jwt_payload.id,
        active: true,
      });

      if (!user) {
        return done(null, false);
      }

      const userData = {
        id: user._id,
        permissionlevel: user.permissionlevel,
      };

      return done(null, userData);
    } catch (error) {
      done(error);
    }
  })
);
