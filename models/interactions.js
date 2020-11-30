const mongoose = require("mongoose"),
  uniqueValidator = require("mongoose-unique-validator");

const interactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  date: { type : Date, default: Date.now },
  messages: { type: String },
  likes: [{ type: String }],
  followers: { type: Number, default: 0 },
  following: { type: Number, default: 0 },
  followingUsers: [{ type: String }],
  followerUsers: [{ type: String }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments" }],
});

interactionSchema.plugin(uniqueValidator);
const interactionModel = mongoose.model("interaction", interactionSchema);
module.exports = interactionModel;
