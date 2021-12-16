const mongoose = require("mongoose");
var uuid = require("node-uuid");

const Schema = mongoose.Schema;

let snippetsSchema = new Schema({
  creatorId: { type: String },
  creator: { type: String },
  title: { type: String },
  snippet: { type: String },
  likes: [String],
});

module.exports = mongoose.model("Snippets", snippetsSchema);
