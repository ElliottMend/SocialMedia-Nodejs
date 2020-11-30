const Comment = require('../../models/comments')
const getComments = (req, res, next) => {
  req.body.posts.map((e) => {
    Comment.find({ post: e._id }, (err, re) => {
      try {
        res.send(re);
      } catch {
        if (err) {
          console.log(err);
        }
      }
    });
  });
};
module.exports = getComments;
