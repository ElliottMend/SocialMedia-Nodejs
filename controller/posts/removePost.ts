import { Request, Response, NextFunction } from "express";

const Post = require("../../models/posts");
const removePost = async (req: Request, res: Response, next: NextFunction) => {
  Post.findById(req.body.id, (err, re) => {
    (re.show = false),
      re.save((err) => {
        if (err) {
          res.status(400).send({ message: "There was an error deleting post" });
        } else {
          res.status(200).send();
        }
      });
  });
};
module.exports = removePost;
