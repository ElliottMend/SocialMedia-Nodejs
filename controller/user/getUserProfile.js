const findUsername = require("../findUsername"),
  Post = require("../../models/posts");
const getUserProfile = async (req, res, next) => {
  let arr = [];
  arr = await Post.find({
    author: req.params.username,
    show: true,
  });
  if (!req.params.username) {
    res.status(400).send({ message: "This user does not exist" });
  } else {
    arr = arr.sort((a, b) => (a.date < b.date ? 1 : -1));

    res.send(arr);
  }
};
module.exports = getUserProfile;
