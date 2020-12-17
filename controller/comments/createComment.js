const Comment = require("../../models/comments"),
  interactionID = require("../interactionId"),
  Interaction = require('../../models/interactions')

const createComment = async (req, res, next) => {
  const comm = new Comment({
    author: res.locals.username,
    likes: req.body.likes,
    text: req.body.text,
    post: req.body.id,
    date: Date.now(),
  });
  const intID = await interactionID(res.locals.username);
  await Interaction.findByIdAndUpdate(intID._id, {
    $push: { comments: req.body.id },
  });
  await comm.save((err) => {
    if (err) {
      res
        .status(401)
        .send({ message: "There was an error creating a comment" });
    } else {
      res.send(comm);
    }
  });
};
module.exports = createComment;
