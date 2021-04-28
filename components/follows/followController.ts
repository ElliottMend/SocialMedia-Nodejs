import { NextFunction, Request, Response } from "express";
import {
  addFollowModel,
  followSuggestionsModel,
  followingDataModel,
  followerDataModel,
  removeFollowModel,
  checkUserFollowModel,
  IFollowData,
} from "./followModel";
import {
  checkUserExistsModel,
  getUserIdByUsername,
} from "../userProfile/userModel";

export const changeFollow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getUserIdByUsername(req.body.user);
    if (user[0]) {
      const follow = await checkUserFollowModel(
        res.locals.user,
        user[0].user_id
      );
      if (follow[0]) await removeFollowModel(res.locals.user, user[0].user_id);
      else await addFollowModel(res.locals.user, user[0].user_id);
      next();
    } else throw 400;
  } catch (err) {
    res.sendStatus(400);
  }
};

export const checkUserFollow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.params.username) res.sendStatus(400);
  const user = await getUserIdByUsername(req.params.username);
  const data = await checkUserFollowModel(res.locals.user, user[0].user_id);
  res.locals.send = data[0] ? "true" : "false";
  next();
};

export const followSuggestions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await followSuggestionsModel(res.locals.user);
    res.locals.send = data;
    next();
  } catch (err) {
    res.sendStatus(400);
  }
};

export const userFollowData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let result: IFollowData[];
  const user = await getUserIdByUsername(req.params.username);
  switch (req.params.follow) {
    case "followers":
      result = await followerDataModel(user[0].user_id);
      break;
    case "following":
      result = await followingDataModel(user[0].user_id);
      break;
    default:
      res.sendStatus(400);
  }
  res.locals.send = result!;
  next();
};
