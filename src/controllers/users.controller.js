const {
  getAllUsers,
  createNewUser,
  getOneUser,
  modifyUserFull,
  setActiveToFalse,
} = require("../models/users.model");

const { hashPassword } = require("../services/hash");

const MIN_PASSWORD_LENGTH = 8;
const PERMISSION_LEVELS = [1, 2, 3, 4, 5];
const ACTIVE_OPTIONS = [0, 1];

async function createUserObject(reqBody) {
  const userModified = {};
  userModified["username"] = reqBody.username;

  if (reqBody.password) {
    if (reqBody.password.length >= MIN_PASSWORD_LENGTH) {
      userModified["password"] = await hashPassword(reqBody.password);
    } else {
      return res.status(400).json({
        error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`,
      });
    }
  }

  if (reqBody.permissionlevel) {
    if (PERMISSION_LEVELS.includes(reqBody.permissionlevel)) {
      userModified["permissionlevel"] = reqBody.permissionlevel;
    } else {
      return res.status(400).json({
        error: `Permission  level must be one of ${PERMISSION_LEVELS}`,
      });
    }
  }

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
  return res.status(200).json(allUsers);
}

async function httpCreateNewUser(req, res) {
  const reqBody = req.body;

  // validate that properties exists
  if (!reqBody.username || !reqBody.password) {
    return res.status(400).json({
      error: "Must provide username and password.",
    });
  }

  const hashedPassword = await hashPassword(reqBody.password);

  const newUser = await createNewUser({
    username: reqBody.username,
    password: hashedPassword,
  });

  if (newUser) {
    return res.status(201).json(newUser);
  } else {
    return res.status(404).json({
      error: "An error ocurred while creating a user",
    });
  }
}

async function httpGetOneUser(req, res) {
  const user = await getOneUser(req.params.username);
  if (!user) {
    return res.status(400).json({
      error: "User not found",
    });
  }
  return res.status(200).json(user);
}

async function httpModifyUserFull(req, res) {
  const reqBody = req.body;

  //check if username is passed
  if (!reqBody.username) {
    return res.status(400).json({
      error: "Username must be present",
    });
  }

  const userModified = await createUserObject(reqBody);

  const newUser = await modifyUserFull(userModified.username, userModified);
  if (newUser) {
    return res.status(201).json(userModified);
  } else {
    return res.status(404).json({
      error: "An error ocurred while modifying the user",
    });
  }
}

async function httpSetActiveToFalse(req, res) {
  const username = req.params.username;

  if (!username) {
    return res.status(400).json({
      error: "Must provide a username",
    });
  }

  const results = await setActiveToFalse(username);

  if (results) {
    return res.status(200).json(results);
  } else {
    return res.status(404).json({
      error: "User not found",
    });
  }
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
