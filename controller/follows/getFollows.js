const Interaction = require("../../models/interactions"),
  User = require("../../models/users");
const getFollows = async (req, res, next) => {
  const follows = await Interaction.find({
    followerUsers: { $nin: [res.locals.username] },
  }).limit(5);
  let arr = [];
  Promise.all(
    follows.map(async (e) => {
      const user = await User.findById(e.user);
      if (user.username !== res.locals.username) {
        arr.push({ bio: user.bio, username: user.username, photo: user.photo });
      }
    })
  );
  res.send(arr);
};
module.exports = getFollows;
