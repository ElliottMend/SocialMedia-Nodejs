const User = require("../../models/users"),
  findUsername = require("../findUsername"),
  interactionID = require("../interactionId"),
  Post = require("../../models/posts");

const getPosts = async (req, res, next) => {
  let arr = [];
  arr.length = 0;
  const user = await findUsername(res.locals.username);
  const find = await User.find({
    "latlng.lat": {
      $gt: user.latlng.lat - req.body.radius,
      $lt: user.latlng.lat + req.body.radius,
    },
    "latlng.lng": {
      $gt: user.latlng.lng - req.body.radius,
      $lt: user.latlng.lng + req.body.radius,
    },
  });
  if (find.length > 0) {
    Promise.all(
      find.map(async (e) => {
        const post = await Post.find({
          author: e.username,
          show: true,
        });
        if (!arr.includes(post)) {
          arr.push(...post);
        } else {
          return;
        }
      })
    );
    const intId = await interactionID(res.locals.username);
    Promise.all(
      intId.followingUsers.map(async (e) => {
        const post = await Post.find({
          author: e,
          show: true,
        });
        if (arr.length > 0) {
          post.forEach((e, index) => {
            if (e._id !== arr[index]._id) {
              if (post.length > 0) {
                return;
              } else {
                arr.push(post);
              }
            } else {
              return;
            }
          });
        } else {
          arr.push(...post);
        }
      })
    );
  }
  res.send(arr);
};
module.exports = getPosts;
