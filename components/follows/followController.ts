import { Request, Response } from "express";
import {
  addFollowModel,
  followSuggestionsModel,
  followingDataModel,
  followerDataModel,
  removeFollowModel,
  checkUserFollowModel,
} from "./followModel";

interface IUser {
  following: string;
}
export interface ISuggestions {
  location: string;
  username: string;
  postId: number;
  body: string;
  date: Date;
  userId: number;
  likes: number;
}
interface IFollowData {
  username: string;
  location: string;
  bio: string;
  photo: string;
}

export const addFollow = async (req: Request, res: Response) => {
  try {
    if (!req.body.author) res.sendStatus(400);
    addFollowModel(res.locals.user, req.body.author);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(400);
  }
};

export const checkUserFollow = async (req: Request, res: Response) => {
  if (!req.params.username) res.sendStatus(400);
  const data: IUser[] = await checkUserFollowModel(
    res.locals.user,
    req.params.username
  );
  res.send(data.length > 0 ? true : false);
};

export const followSuggestions = async (req: Request, res: Response) => {
  try {
    const data: ISuggestions[] = await followSuggestionsModel(res.locals.user);
    res.send(data);
  } catch (err) {
    res.sendStatus(400);
  }
};

export const removeFollow = async (req: Request, res: Response) => {
  try {
    removeFollowModel(res.locals.user, req.body.author);
    res.status(200).send();
  } catch (err) {
    res.status(400).send({ message: "There was an error" });
  }
};

export const userFollowData = async (req: Request, res: Response) => {
  let result: IFollowData[];
  if (req.params.follow === "followers") {
    result = await followerDataModel(req.params.username);
  } else {
    result = await followingDataModel(req.params.username);
  }
  res.send(result);
};
