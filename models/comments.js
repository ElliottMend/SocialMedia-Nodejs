const mongoose = require("mongoose"),
  uniqueValidator = require("mongoose-unique-validator");

const commentSchema = new mongoose.Schema({
  author: { type: String },
  text: { type: String, required: true },
  date: { type: Number },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "posts" },
  likes: { type: Number, default: 0 },
  show: { type: Boolean, default: true },
});
commentSchema.plugin(uniqueValidator);
const commentModel = mongoose.model("comments", commentSchema);
module.exports = commentModel;
