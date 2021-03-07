import { Request, Response, NextFunction } from "express";

import { NextFunction, Request, Response } from "express";
const Comment = require("../../models/comments");
interface IComment extends Comment {}

const removeComments = (req: Request, res: Response, next: NextFunction: NextFunction) => {
  Comment.findById(req.body.id, (err, user) => {
    if (user) {
      (user.show = false),
        user.save((err) => {
          if (err) {
            res
              .status(400)
              .send({ message: "There was an error deleting comment" });
          } else {
            res.status(200).send();
          }
        });
    } else {
      res.status(400).send({ message: "There is no comment" });
    }
  });
};
module.exports = removeComments;
