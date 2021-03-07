import { Request, Response, NextFunction } from "express";

import { NextFunction, Request, Response } from "express";
import pool from "../../app";
const Comment = require("../../models/comments");

const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const comm = new Comment({
    author: res.locals.username,
    likes: req.body.likes,
    text: req.body.text,
    post: req.body.id,
    date: Date.now(),
  });
  const query = "INSERT INTO ";
  await comm.save(async (err) => {
    if (err) {
      res
        .status(401)
        .send({ message: "There was an error creating a comment" });
    } else {
      const intID = await interactionID(res.locals.username);
      await Interaction.findByIdAndUpdate(intID._id, {
        $push: { comments: comm._id },
      });
      await Post.findByIdAndUpdate(req.body.id, {
        $push: { comments: comm._id },
      });
      res.status(200).send(comm);
    }
  });
};
module.exports = createComment;
