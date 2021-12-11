const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let usersSchema = new Schema({
  id: { type: Number },
  username: { type: String },
  password: { type: String },
});

module.exports = mongoose.model("Users", usersSchema);
