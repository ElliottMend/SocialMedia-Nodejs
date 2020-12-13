const findUsername = require("../findUsername"),
  Post = require("../../models/posts");
const getUserProfile = async (req, res, next) => {
  const posts = await Post.find({ author: req.params.username, show: true });
  if (!req.params.username) {
    res.status(400).send({ message: "This user does not exist" });
  } else {
    res.send(posts);
  }
};
module.exports = getUserProfile;
