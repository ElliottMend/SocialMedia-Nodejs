const Post = require("../../models/posts"),
  interactionID = require("../interactionId"),
  Interaction = require("../../models/interactions");
const removeLike = async (req, res, next) => {
  
  const like = await Post.findById({ _id: req.body.id });
  if (like.likes <= 0) {
    await Post.findByIdAndUpdate(req.body.id, { likes: 0 });
  } else {
    await Post.findByIdAndUpdate(req.body.id, { $inc: { likes: -1 } });
  }
  const intID = await interactionID(res.locals.username);
  await Interaction.findByIdAndUpdate(
    intID._id,
    { $pull: { likes: req.body.id } },
    { multi: true }
  );
  Post.findById(req.body.id, (err, docs) => {
    if (err) {
      res.status(400).send({ message: "There was an error finding that post" });
    } else {
      res.send(docs.likes);
    }
  });
};
module.exports = removeLike;
