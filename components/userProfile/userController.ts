import { NextFunction, Request, Response } from "express";
import { secrets } from "../../app";
import {
  userProfileModel,
  userEditModel,
  editProfileModel,
  userLikesModel,
  userPostsModel,
  getUserIdByUsername,
  userCommentModel,
  userSearchModel,
} from "./userModel";

export const getUserEdit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await userEditModel(res.locals.user);
    if (!data[0]) throw 400;
    res.locals.send = {
      bio: data[0].bio,
      latlng: data[0].latlng,
      image: data[0].photo,
      location: data[0].location,
    };
    next();
  } catch (err) {
    res.sendStatus(400);
  }
};
export const userSearch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await userSearchModel(req.params.username);
  res.locals.send = user;
  next();
};
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await getUserIdByUsername(req.params.username);
    if (!user[0]) throw 400;
    const profile = await userProfileModel(user[0].user_id);
    const Likes = await userLikesModel(user[0].user_id);
    const Posts = await userPostsModel(user[0].user_id);
    const Comments = await userCommentModel(user[0].user_id);
    const data = {
      profile: profile[0],
      data: { Likes, Posts, Comments },
    };
    res.send(data);
  } catch (err) {
    res.sendStatus(400);
  }
};

export const userEdit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await editProfileModel(
      req.body.latlng,
      req.body.location,
      res.locals.user,
      req.body.image,
      req.body.bio
    );
    next();
  } catch (err) {
    res.sendStatus(400);
  }
};

export const userEditLocation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.locals.send = secrets.REACT_PLACES_API_KEY;
  next();
};
