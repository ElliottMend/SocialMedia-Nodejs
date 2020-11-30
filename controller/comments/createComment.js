const Comment = require('../../models/comments')

const createComment = (req,res,next) =>{
    const comm = new Comment({
        author: req.body.author,
        likes: req.body.likes,
        text: req.body.text,
        post: req.body.id,
        date: Date.now(),
      });
      await comm.save((err) => {
        if (err) {
          console.log(err);
        } else {
          res.send(comm);
        }
      });
}
module.exports = createComment;