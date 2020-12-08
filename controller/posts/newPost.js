const findUsername = require("../findUsername"),
  Post = require("../../models/posts");
const newPost = async (req, res, next) => {
  
  const re = await findUsername(res.locals.username);
  const posts = new Post({
    author: res.locals.username,
    location: re.location,
    body: req.body.body,
    date: Date.now(),
    img: req.body.img,
  });
  await posts.save((err) => {
    if (err !== null) {
      res.status(400).statusMessage("Body text is required");
    } else {
      res.send(posts);
    }
  });
};
module.exports = newPost;
