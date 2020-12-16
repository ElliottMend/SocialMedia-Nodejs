const User = require("../../models/users"),
  findUsername = require("../findUsername"),
  interactionID = require("../interactionId"),
  Post = require("../../models/posts");

const getPosts = async (req, res, next) => {
  let arr = [];
  arr.length = 0;
  console.log("fdsfd");
  const user = await findUsername(res.locals.username);
  const radius = Number(req.body.radius);
  const find = await User.find({
    "latlng.lat": {
      $gt: user.latlng.lat - radius,
      $lt: user.latlng.lat + radius,
    },
    "latlng.lng": {
      $gt: user.latlng.lng - radius,
      $lt: user.latlng.lng + radius,
    },
  });
  if (find.length > 0) {
    Promise.all(
      find.map(async (e) => {
        const post = await Post.find({
          author: e.username,
          show: true,
        }).sort({ author: 1 });
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
  console.log(arr)
  arr = arr.sort((a, b) => (a.date < b.date ? 1 : -1));
  console.log(arr)
  res.send(arr);
};
module.exports = getPosts;
