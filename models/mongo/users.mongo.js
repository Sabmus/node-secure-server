const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  permissionlevel: { type: Number, default: 1 },
  active: { type: Boolean, default: true },
});

module.exports = mongoose.model("User", usersSchema);
