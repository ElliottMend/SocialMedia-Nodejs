import { Request, Response } from "express";
import { newPostModel } from "../../models/posts/newPostModel";
import { userProfileModel } from "../../models/userProfile/userProfileModel";
import { IProfile } from "../user/getUserProfile";
export interface IQuery {
  body: string;
  date: Date;
  postId: number;
  userId: number;
  likes: number;
}
export const newPost = async (req: Request, res: Response) => {
  try {
    const post: IQuery = await newPostModel(req.body.body, res.locals.user);
    const profile: IProfile = await userProfileModel(res.locals.username);
    const data: IQuery = {
      ...post,
      ...profile,
    };
    res.send(data);
  } catch (err) {
    res.sendStatus(400);
  }
};
