const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let snippetsSchema = new Schema({
  id: { type: Number },
  ownerId: { type: Number },
  title: { type: String },
  snippet: { type: String },
});

module.exports = mongoose.model("Snippets", snippetsSchema);
