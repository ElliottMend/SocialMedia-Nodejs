import { NextFunction, Request, Response } from "express";
import { ISuggestions } from "../follows/followController";
import { newPostModel, getPostsModel, removePostModel } from "./postsModel";
import { userProfileModel } from "../userProfile/userModel";
import { IProfile } from "../userProfile/userController";
export interface IPost extends ISuggestions {
  body: string;
  date: Date;
  postId: number;
  userId: number;
  likes: number;
  photo: string;
}
export interface IQuery {
  body: string;
  date: Date;
  postId: number;
  userId: number;
  likes: number;
}

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts: IPost[] = await getPostsModel(
      Number(req.params.radius),
      res.locals.user
    );
    res.locals.send = posts;
    next();
  } catch (err) {
    res.sendStatus(400);
  }
};

export const newPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.body.text.length > 144) throw 400;
    const post: IQuery[] = await newPostModel(req.body.text, res.locals.user);
    const profile: IProfile[] = await userProfileModel(res.locals.user);
    const data: IQuery = {
      ...post,
      ...profile[0],
    };
    res.locals.send = data;
    next();
  } catch (err) {
    res.sendStatus(400);
  }
};

export const removePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await removePostModel(req.body.id, res.locals.user);
    next();
  } catch (err) {
    res.sendStatus(400);
  }
};
