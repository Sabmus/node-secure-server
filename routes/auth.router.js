const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

const secretSignKey = "this is a secret";

authRouter.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  (req, res, next) => {
    res.json({
      message: "Signup successful",
      user: req.user,
    });
  }
);

authRouter.post("/login", (req, res, next) => {
  passport.authenticate("login", (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error(info);
        return next(error);
      }

      req.login(user, { session: false }, (error) => {
        if (error) return next(error);

        const body = { id: user._id };
        const token = jwt.sign({ user: body }, secretSignKey);

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

authRouter.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      message: "Logged out succesfully",
    });
  });
});

module.exports = authRouter;
