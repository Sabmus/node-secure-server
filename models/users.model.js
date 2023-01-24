const userModel = require("./mongo/users.mongo");

const { hashPassword } = require("../services/hash");

// check if user exists
async function checkUsernameExists(username) {
  return await userModel.exists({ username: username });
}

async function getAllUsers() {
  return await userModel.find({}, { _id: 0, __v: 0, password: 0 });
}

async function createNewUser(newUser) {
  const userExists = await checkUsernameExists(newUser.username);
  if (userExists) {
    throw new Error("An error ocurred creating a User");
  }

  const newlyCreatedUser = await userModel.create(newUser);
  return newlyCreatedUser;
}

async function getOneUser(username) {
  return await userModel.findOne(
    { username: username },
    { _id: 0, __v: 0, password: 0 }
  );
}

// can modify password, permissionlevel and active
async function modifyUserFull(username, modifiedUser) {
  return await userModel.findOneAndUpdate(
    { username: username },
    modifiedUser,
    {
      returnDocument: "after",
    }
  );
}

async function setActiveToFalse(username) {
  return await userModel.findOneAndUpdate(
    { username: username, active: true },
    {
      active: false,
    },
    {
      returnDocument: "after",
    }
  );
}

module.exports = {
  getAllUsers,
  createNewUser,
  getOneUser,
  modifyUserFull,
  setActiveToFalse,
};
