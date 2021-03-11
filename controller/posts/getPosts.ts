import { Request, Response } from "express";

import { getPostsModel } from "../../models/posts/getPostsModel";
import { IQuery } from "../follows/followSuggestions";

export interface IPost extends IQuery {
  body: string;
  date: Date;
  post_id: number;
  user_id: number;
  likes: number;
  photo: string;
}
export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts: IPost[] = await getPostsModel(
      Number(req.params.radius),
      res.locals.user
    );
    res.send(posts);
  } catch (err) {
    res.sendStatus(400);
  }
};
