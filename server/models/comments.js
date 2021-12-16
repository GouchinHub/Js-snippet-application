const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let commentsSchema = new Schema({
  creatorId: { type: String },
  creator: { type: String },
  snippetId: { type: String },
  comment: { type: String },
  likes: [String],
});

module.exports = mongoose.model("Comments", commentsSchema);
