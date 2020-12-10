const Post = require("../../models/posts"),
  interactionID = require("../interactionId"),
  Interaction = require("../../models/interactions");
const addLike = async (req, res, next) => {
  await Post.findByIdAndUpdate(req.body.id, { $inc: { likes: 1 } });
  const intID = await interactionID(res.locals.username);
  await Interaction.findByIdAndUpdate(intID._id, {
    $push: { likes: req.body.id },
  });
  try {
    const results = await Post.findById(req.body.id);
    res.send(results.likes);
  } catch (err) {
    res.status(400).send({ message: "Cannot find that post" });
  }
};
module.exports = addLike;
