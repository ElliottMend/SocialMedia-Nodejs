const Comment = require("../../models/comments"),
  interactionID = require("../interactionId"),
  Interaction = require("../../models/interactions"),
  Post = require("../../models/posts");

const createComment = async (req, res, next) => {
  const comm = new Comment({
    author: res.locals.username,
    likes: req.body.likes,
    text: req.body.text,
    post: req.body.id,
    date: Date.now(),
  });
  await comm.save(async (err) => {
    if (err) {
      res
        .status(401)
        .send({ message: "There was an error creating a comment" });
    } else {
      const intID = await interactionID(res.locals.username);
      await Interaction.findByIdAndUpdate(intID._id, {
        $push: { comments: comm._id },
      });
      await Post.findByIdAndUpdate(req.body.id, {
        $push: { comments: comm._id },
      });
      res.status(200).send(comm);
    }
  });
};
module.exports = createComment;
