const interactionId = require("../interactionId"),
  Post = require("../../models/posts");

const getUserLikes = async (req, res, next) => {
  const interaction = await interactionId(req.params.username);
  let arr = [];
  if (interaction) {
    Promise.all(
      interaction.likes.map(async (e) => {
        const posts = await Post.findById(e);
        arr.push(posts);
      })
    ).then(() => res.send(arr));
  } else {
    res.send(arr);
  }
};
module.exports = getUserLikes;
