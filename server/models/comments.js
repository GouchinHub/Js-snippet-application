const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let commentsSchema = new Schema({
  ownerId: { type: Number },
  snippetId: { type: Number },
  comment: { type: String },
  likes: { type: Number },
});

module.exports = mongoose.model("Comments", commentsSchema);
