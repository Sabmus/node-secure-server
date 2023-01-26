const {
  checkUsernameExists,
  getAllUsers,
  createNewUser,
  getOneUser,
  modifyUserFull,
  setActiveToFalse,
} = require("../models/users.model");

const { hashPassword } = require("../utils/hash");

const MIN_PASSWORD_LENGTH = 8;
const PERMISSION_LEVELS = [1, 2, 3, 4, 5];
const ACTIVE_OPTIONS = [0, 1];

async function createUserObject(reqBody) {
  const userModified = {};

  // if password is passed, hashes the password after validate MIN_PASSWORD_LENGTH
  if (reqBody.password) {
    if (reqBody.password.length >= MIN_PASSWORD_LENGTH) {
      userModified["password"] = await hashPassword(reqBody.password);
    } else {
      return res.status(400).json({
        error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`,
      });
    }
  }

  // if permissionlevel is passed, validate that it's one of the available levels
  if (reqBody.permissionlevel) {
    if (PERMISSION_LEVELS.includes(reqBody.permissionlevel)) {
      userModified["permissionlevel"] = reqBody.permissionlevel;
    } else {
      return res.status(400).json({
        error: `Permission  level must be one of ${PERMISSION_LEVELS}`,
      });
    }
  }

  // if active is passed, validate that is: 1 or 0
  if (reqBody.active || reqBody.active === 0) {
    if (ACTIVE_OPTIONS.includes(reqBody.active)) {
      userModified["active"] = reqBody.active;
    } else {
      return res.status(400).json({
        error: `Active must be on of ${ACTIVE_OPTIONS}`,
      });
    }
  }

  return userModified;
}

async function httpGetUsers(req, res) {
  const allUsers = await getAllUsers();

  if (!allUsers) {
    return res.status(200).json({
      message: "No users in db",
    });
  }

  return res.status(200).json(allUsers);
}

async function httpCreateNewUser(req, res) {
  const { username, password } = req.body;

  // validate that properties exists
  if (!username || !password) {
    return res.status(400).json({
      error: "Must provide username and password.",
    });
  }

  // validat if user exists in db
  const isAlreadyUser = await checkUsernameExists(username);

  if (isAlreadyUser) {
    return res.status(409).json({
      error: "User already exists",
    });
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await createNewUser({
    username,
    password: hashedPassword,
  });

  if (!newUser) {
    return res.status(400).json({
      error: "An error ocurred while creating a user",
    });
  }

  return res.status(201).json(newUser);
}

async function httpGetOneUser(req, res) {
  const user = await getOneUser(req.params.username);

  if (!user) {
    return res.status(404).json({
      error: "User not found",
    });
  }
  return res.status(200).json(user);
}

async function httpModifyUserFull(req, res) {
  const username = req.params.username;
  const reqBody = req.body;

  //check if username is passed
  const userExists = checkUsernameExists(username);
  if (!userExists) {
    return res.status(404).json({
      error: "Username not found",
    });
  }

  // this will create a user object to be updated in base of the fields passed
  const userModified = await createUserObject(reqBody);

  const newUser = await modifyUserFull(username, userModified);
  if (!newUser) {
    return res.status(404).json({
      error: "User not found",
    });
  }

  return res.status(200).json(newUser);
}

async function httpSetActiveToFalse(req, res) {
  const username = req.params.username;

  // check if username was passed
  if (!username) {
    return res.status(400).json({
      error: "Must provide a username",
    });
  }

  const userWithActiveModified = await setActiveToFalse(username);

  if (!userWithActiveModified) {
    return res.status(404).json({
      error: "User not found",
    });
  }

  return res.status(200).json(userWithActiveModified);
}

async function httpGetOwnUser(req, res) {
  return res.json(req.user);
}

module.exports = {
  httpGetUsers,
  httpCreateNewUser,
  httpGetOneUser,
  httpModifyUserFull,
  httpSetActiveToFalse,
  httpGetOwnUser,
};
