const findUsername = require('../findUsername'),
    Post = require('../../models/posts')
const newPost = (req,res,next) =>{
    const re = await findUsername(req.body.username);
  const posts = new Post({
    author: req.body.username,
    location: re[0].location,
    body: req.body.body,
    date: Date.now(),
    img: req.body.img,
  });
  await posts.save((err) => {
    if (err !== null) {
      res.status(400).statusMessage("Body text is required");
    } else {
      res.json(posts);
    }
  });
}
module.exports = newPost