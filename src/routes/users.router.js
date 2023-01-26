const express = require("express");

const {
  httpGetUsers,
  httpCreateNewUser,
  httpGetOneUser,
  httpModifyUserFull,
  httpSetActiveToFalse,
  httpGetOwnUser,
} = require("../controllers/users.controller");

const usersRouter = express.Router();

// get all users
usersRouter.get("/", httpGetUsers);
// create a user
usersRouter.post("/", httpCreateNewUser);
// get one user
usersRouter.get("/:username", httpGetOneUser);
// modify a user
usersRouter.put("/:username", httpModifyUserFull);
// delete a user
usersRouter.delete("/:username", httpSetActiveToFalse);
// get own user
usersRouter.get("/me", httpGetOwnUser);

module.exports = usersRouter;
