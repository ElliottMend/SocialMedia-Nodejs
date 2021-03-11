import { Request, Response } from "express";
import { newPostModel } from "../../models/posts/newPostModel";
export interface IQuery {
  body: string;
  date: Date;
  post_id: number;
  user_id: number;
  likes: number;
}
export const newPost = async (req: Request, res: Response) => {
  try {
    const re: IQuery = await newPostModel(req.body.body, res.locals.user, res);
    res.send(re);
  } catch (err) {
    res.sendStatus(400);
  }
};
