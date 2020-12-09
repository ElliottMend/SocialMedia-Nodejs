const interactionID = require("../interactionId"),
  Interaction = require("../../models/interactions");
const addFollows = async (req, res, next) => {
  try {
    const userId = await interactionID(res.locals.username);
    if (userId.followingUsers.includes(req.body.author)) {
      res.status(400).send({ message: "You already follow this user" });
    } else {
      userId.followingUsers.push(req.body.author);
    }
    await Interaction.findByIdAndUpdate(userId, {
      following: userId.followingUsers.length,
    });
    const authorId = await interactionID(req.body.author);
    if (authorId.followerUsers.includes(res.locals.username)) {
      return;
    } else {
      authorId.followerUsers.push(res.locals.username);
    }
    await Interaction.findByIdAndUpdate(authorId, {
      followers: authorId.followerUsers.length,
    });
    console.log(authorId, userId);
    authorId.save();
    userId.save();
    res.status(200).send();
  } catch (err) {
    res.status(400).send({ message: "There was an error" });
  }
};
module.exports = addFollows;
