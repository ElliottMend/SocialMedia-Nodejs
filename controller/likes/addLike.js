const Post = require("../../models/posts"),
  interactionID = require("../interactionId"),
  Interaction = require("../../models/interactions");
const addLike = async (req, res, next) => {
  await Post.findByIdAndUpdate(req.body.id, { $inc: { likes: 1 } });
  const intID = await interactionID(res.locals.username);
  await Interaction.findByIdAndUpdate(intID._id, {
    $push: { likes: req.body.id },
  });
  Post.findById(req.body.id, (err, docs) => {
    if (err) {
      res.status(400).send({ message: "Cannot find that post" });
    } else {
      res.send(docs.likes);
    }
  });
};
module.exports = addLike;
