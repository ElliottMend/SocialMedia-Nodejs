const findUsername = require("../findUsername");
const followData = (req, res, next) => {
  let arr = [];
  Promise.all(
    req.body.users.map(async (e) => {
      const users = await findUsername(e);
      users.map((i) => {
        arr.push({
          photo: i.photo,
          bio: i.bio,
          username: i.username,
        });
      });
    })
  );
  res.send(arr);
};
module.exports = followData;
