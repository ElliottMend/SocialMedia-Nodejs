const interactionID = require("../interactionId"),
  Interaction = require("../../models/interactions");
const addFollows = async (req, res, next) => {
  try {
    const userId = await interactionID(req.body.user);
    if (userId.followingUsers.includes(req.body.author)) {
      return;
    } else {
      userId.followingUsers.push(req.body.author);
    }
    await Interaction.findByIdAndUpdate(userId, {
      following: userId.followingUsers.length,
    });

    const authorId = await interactionID(req.body.author);
    if (authorId.followerUsers.includes(req.body.user)) {
      return;
    } else {
      authorId.followerUsers.push(req.body.user);
    }
    await Interaction.findByIdAndUpdate(authorId, {
      followers: authorId.followerUsers.length,
    });
    authorId.save();
    userId.save();
    res.status(200).send();
  } catch (err) {
    res.status(400).send({ message: "There was an error" });
  }
};
module.exports = addFollows;
