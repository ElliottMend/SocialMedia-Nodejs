const findUsername = require("../findUsername"),
  Post = require("../../models/posts");
const getUser = async (req, res, next) => {
  const user = await findUsername(req.body.username);
  const posts = await Post.find({ author: req.body.username });
  if (user.length === 0) {
    res.status(400).send({ message: "This user does not exist" });
  } else {
    res.send(posts);
  }
};
module.exports = getUser;
