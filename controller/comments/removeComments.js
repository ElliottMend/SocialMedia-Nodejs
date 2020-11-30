const Comment = require("../../models/comments");
const removeComments = (req, res, next) => {
  Comment.findById(req.body.id, (err, user) => {
    if (user) {
      (user.show = false),
        user.save((err) => {
          if (err) {
            res
              .status(400)
              .send({ message: "There was an error deleting comment" });
          }else{
            res.status(200).send()
          }
        });
    } else {
      res.status(400).send({ message: "There is no comment" });
    }
  });
};
module.exports = removeComments;
