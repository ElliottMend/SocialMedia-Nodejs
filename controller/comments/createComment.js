const Comment = require("../../models/comments");

const createComment = async (req, res, next) => {
  const comm = new Comment({
    author: res.locals.username,
    likes: req.body.likes,
    text: req.body.text,
    post: req.body.id,
    date: Date.now(),
  });
  await comm.save((err) => {
    if (err) {
      res
        .status(401)
        .send({ message: "There was an error creating a comment" });
    } else {
      res.send(comm);
    }
  });
};
module.exports = createComment;
