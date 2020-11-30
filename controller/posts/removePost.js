const Post = require('../../models/posts')
const removePost = (req, res, next) => {
  Post.findById(req.body.id, (err, re) => {
    (re.show = false),
      re.save((err) => {
        if (err) {
          console.log(err);
        }
      });
  });
};
module.exports = removePost;
