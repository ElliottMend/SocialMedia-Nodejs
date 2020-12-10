const findUsername = require("../findUsername");
const followData = (req, res, next) => {
  let arr = [];
  Promise.all(
    req.body.users.map(async (e) => {
      const users = await findUsername(e);
      arr.push({
        photo: users.photo,
        bio: users.bio,
        username: users.username,
      });
    })
  ).then((re) => res.send(arr));
};
module.exports = followData;
