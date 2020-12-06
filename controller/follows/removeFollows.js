const interactionID = require("../interactionId"),
  Interaction = require("../../models/interactions");
const removeFollows = async (req, res, next) => {
  try {
    const userId = await interactionID(res.locals.username);
    if (userId.followingUsers.includes(req.body.author)) {
      userId.followingUsers.pull(req.body.author);
    }
    if (userId.following <= 0) {
      Interaction.findByIdAndUpdate(userId, { following: 0 });
    } else {
      await Interaction.findByIdAndUpdate(userId, {
        following: userId.followingUsers.length,
      });
    }

    const authorId = await interactionID(req.body.author);
    if (authorId.followerUsers.includes(res.locals.username)) {
      authorId.followerUsers.pull(res.locals.username);
    }
    if (authorId.followers <= 0) {
      Interaction.findByIdAndUpdate(authorId, { followers: 0 });
    } else {
      await Interaction.findByIdAndUpdate(authorId, {
        follower: authorId.followerUsers.length,
      });
    }

    authorId.save();
    userId.save();
    res.status(200).send();
  } catch (err) {
    res.status(400).send({ message: "There was an error" });
  }
};
module.exports = removeFollows;
