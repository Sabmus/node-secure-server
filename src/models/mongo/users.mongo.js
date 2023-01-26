const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const usersSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  permissionlevel: { type: Number, default: 1 },
  active: { type: Boolean, default: true },
});

// hashes password before save to db
// usersSchema.pre("save", async function (next) {
//   const user = this;
//   const hashedPassword = await bcrypt.hash(user.password, saltRounds);
//   this.password = hashedPassword;
//   next();
// });

// validate that the new password matches the hashed password
// usersSchema.methods.isValidPassword = async function (password) {
//   const user = this;
//   const result = await bcrypt.compare(password, user.password);
//   return result;
// };

module.exports = mongoose.model("User", usersSchema);
