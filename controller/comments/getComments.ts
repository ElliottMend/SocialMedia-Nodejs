import { Request, Response, NextFunction } from "express";

import { NextFunction, Request, Response } from "express";
const Comment = require("../../models/comments");

const getComments = (req: Request, res: Response, next: NextFunction: NextFunction) => {
  req.body.posts.map((e) => {
    Comment.find({ post: e._id, show: true }, (err, re) => {
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
