const findUsername = require("../findUsername"),
  Post = require("../../models/posts"),
  interactionId = require("../interactionId");
const getUserProfile = async (req, res, next) => {
  let postArray = [];
  const user = await findUsername(req.params.username);
  postArray = await Post.find({
    author: req.params.username,
    show: true,
  });
  const interaction = await interactionId(req.params.username);
  let likeArray = [];
  const mapLikes = interaction.likes.map(async (e) => {
    const posts = await Post.findById(e);
    likeArray.push(posts);
  });
  Promise.all(mapLikes).then(() => {
    let commentArray = [];
    const mapComments = interaction.comments.map(async (e) => {
      if (e) {
        const comments = await Post.findById(e);
        commentArray.push(comments);
      }
    });
    Promise.all(mapComments).then(() => {
      if (!req.params.username) {
        res.status(400).send({ message: "This user does not exist" });
      } else {
        postArray = postArray.sort((a, b) => (a.date < b.date ? 1 : -1));
        res.status(200).send({
          bio: user.bio,
          photo: user.photo,
          location: user.location,
          posts: postArray,
          likes: likeArray,
          comments: commentArray,
        });
      }
    });
  });
};
module.exports = getUserProfile;
