const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  permissionlevel: { type: Number, default: 1 },
  active: { type: Boolean, default: true },
});

/** 
 * You can define a pre save action, for instance: to hash the users password
 * we're not going to use this approach, instead we're going to manage this
 * inside of our controller, but I left this here so you know it
 
const bcrypt = require("bcrypt");
const saltRounds = 10;

// hashes password before save to db
usersSchema.pre("save", async function (next) {
  const user = this;
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);
  this.password = hashedPassword;
  next();
});

// Also you can define methods, for instance: to check if the hashed are corrects
// validate that the new password matches the hashed password
usersSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const result = await bcrypt.compare(password, user.password);
  return result;
};
*/

module.exports = mongoose.model("User", usersSchema);
