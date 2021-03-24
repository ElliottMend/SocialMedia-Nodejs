import { Request, Response } from "express";
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

export const removePost = async (req: Request, res: Response) => {
  try {
    await removePostModel(req.body.id);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(400);
  }
};
