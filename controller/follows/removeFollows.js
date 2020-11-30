const interactionID = require('../interactionId'),
    Interaction = require('../../models/interactions')
const removeFollows = (req, res, next) => {
    const userId = await interactionID(req.body.user);
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
    if (authorId.followerUsers.includes(req.body.user)) {
        authorId.followerUsers.pull(req.body.user);
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
}
module.exports = removeFollows