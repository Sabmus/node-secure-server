const express = require("express");

const usersRouter = require("./users.router");
const authRouter = require("./auth.router");

const api = express.Router();

api.use("/users", usersRouter);
api.use("/auth", authRouter);

module.exports = api;
