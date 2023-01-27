const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

// to sign our JWT token
const secretSignKey = process.env.SECRET_JWT_SIGN;
// we set a expiration time of 8 hours
const EXPIRATION = 1000 * 60 * 60 * 8;

authRouter.post("/login", (req, res, next) => {
  passport.authenticate("login", (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error(info.message);
        return next(error.message);
      }

      req.login(user, { session: false }, (error) => {
        if (error) return next(error);

        const payload = {
          id: user.id,
          permissionlevel: user.permissionlevel,
        };

        const token = jwt.sign(payload, secretSignKey, {
          expiresIn: EXPIRATION,
        });

        //return res.json({ token });
        return res
          .cookie("token", token, {
            signed: true,
            maxAge: EXPIRATION,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          })
          .status(200)
          .json({
            message: "login successfully",
            user: req.user,
          });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

authRouter.post("/logout", function (req, res) {
  return res.clearCookie("token").status(200).json({
    message: "Logged out succesfully",
  });
});

module.exports = authRouter;
