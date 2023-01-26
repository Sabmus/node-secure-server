const userModel = require("./mongo/users.mongo");

// check if user exists
async function checkUsernameExists(username) {
  try {
    return await userModel.exists({ username: username });
  } catch (error) {
    throw new Error("An error ocurred while checking if user exists", error);
  }
}

// returns all users in db
async function getAllUsers() {
  try {
    return await userModel.find({}, { _id: 0, __v: 0, password: 0 });
  } catch (error) {
    throw new Error("An error ocurred while getting all users", error);
  }
}

// create a new user in db
async function createNewUser(newUser) {
  try {
    return await userModel.create(newUser);
  } catch (error) {
    throw new Error("An error ocurred while creating a new user", error);
  }
}

// get one user from db
async function getOneUser(username) {
  try {
    return await userModel.findOne(
      { username: username },
      { _id: 0, __v: 0, password: 0 }
    );
  } catch (error) {
    throw new Error("An error ocurred while getting one user", error);
  }
}

// can modify password, permissionlevel and active
async function modifyUserFull(username, modifiedUser) {
  try {
    return await userModel.findOneAndUpdate(
      { username: username },
      modifiedUser,
      {
        returnDocument: "after",
      }
    );
  } catch (error) {
    throw new Error("An error ocurred while modifying a user", error);
  }
}

// instead of deleting a record from db, it changes the active status to false
async function setActiveToFalse(username) {
  try {
    return await userModel.findOneAndUpdate(
      { username: username, active: true },
      {
        active: false,
      },
      {
        returnDocument: "after",
      }
    );
  } catch (error) {
    throw new Error("An error ocurred while setting active status", error);
  }
}

module.exports = {
  checkUsernameExists,
  getAllUsers,
  createNewUser,
  getOneUser,
  modifyUserFull,
  setActiveToFalse,
};
