const Post = require('../../models/posts'),
  interactionID = require('../interactionId'),
  Interaction = require('../../models/interactions')
const addLike = (req,res,next) =>{
    await Post.findByIdAndUpdate(req.body.id, { $inc: { likes: 1 } });
  const intID = await interactionID(req.body.user);
  await Interaction.findByIdAndUpdate(intID._id, {
    $push: { likes: req.body.id },
  });
  Post.findById(req.body.id, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      res.json(docs.likes);
    }
  });
}
module.exports = addLike;