const Comment = require("../../models/comments");

const removeComments = (req, res, next) => {
  Comment.findById(req.body.id, (err, user) => {
    if (user) {
      (user.show = false),
        user.save((err) => {
          if (err) {
            console.log(err);
          }
        });
    } else {
      return;
    }
  });
};
module.exports = removeComments;
