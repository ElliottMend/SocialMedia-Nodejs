const mongoose = require("mongoose"),
  uniqueValidator = require("mongoose-unique-validator");

const postSchema = new mongoose.Schema({
  author: { type: String },
  date: { type: Number },
  body: { type: String, required: true },
  image: { data: Buffer, contentType: String },
  likes: { type: Number, default: 0 },
  location: { type: String },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments" }],
  show: { type: Boolean, default: true },
});

postSchema.plugin(uniqueValidator);
const postModel = mongoose.model("posts", postSchema);
module.exports = postModel;
