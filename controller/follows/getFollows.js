const Interaction = require("../../models/interactions"),
  User = require("../../models/users");
const getFollows = async (req, res, next) => {
  const follows = await Interaction.find({
    followerUsers: { $nin: [req.body.user] },
  }).limit(5);
  let arr = [];
  Promise.all(
    follows.map(async (e) => {
      const user = await User.findById(e.user);
      if (user.username !== req.body.user) {
        arr.push({ bio: user.bio, username: user.username, photo: user.photo });
      }
    })
  );
  res.send(arr);
};
module.exports = getFollows;
