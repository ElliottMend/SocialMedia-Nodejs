import { Request, Response } from "express";
import { newPostModel } from "../../models/posts/newPostModel";
export const newPost = async (req: Request, res: Response) => {
  try {
    const re = await newPostModel(req.body.body, res.locals.user, res);
    res.send(re);
  } catch (err) {
    res.sendStatus(400);
  }
};
