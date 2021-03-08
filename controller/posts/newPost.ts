import { Request, Response, NextFunction } from "express";
import { newPostModel } from "../../models/posts/newPostModel";
const newPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const re = await newPostModel(req.body.body, res.locals.username, res);
    res.send(re);
  } catch (err) {
    res.sendStatus(400);
  }
};
module.exports = newPost;
