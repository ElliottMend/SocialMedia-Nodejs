const Comment = require("../../models/comments");
const getComments = (req, res, next) => {
  req.body.posts.map((e) => {
    Comment.find({ post: e._id }, (err, re) => {
      try {
        res.send(re);
      } catch {
        if (err) {
          res
            .status(400)
            .send({ message: "There was an error getting comments" });
        }
      }
    });
  });
};
module.exports = getComments;
