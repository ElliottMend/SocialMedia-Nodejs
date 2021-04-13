import { NextFunction, Request, Response } from "express";
import { QueryResult } from "pg";
import { secrets } from "../../app";
import {
  userProfileModel,
  userEditModel,
  editProfileModel,
  userLikesModel,
  userPostsModel,
  getUserIdByUsername,
} from "./userModel";
export interface IUserEdit {
  latlng: { lat: number; lng: number };
  location: string;
  bio: string;
  photo: string;
}
interface IId {
  user_id: number;
}
interface IPost {
  body: string;
  userId: number;
  date: Date;
  likes: number;
  postId: number;
}
export interface IProfile extends IPost {
  location: string;
  username: string;
}
export const getUserEdit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: IUserEdit[] = await userEditModel(res.locals.user);
    if (!data) throw 400;
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

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const user: IId[] = await getUserIdByUsername(req.params.username);
    if (!user[0]) throw 400;
    const profile: IProfile[] = await userProfileModel(user[0].user_id);
    const Likes: IPost[] = await userLikesModel(user[0].user_id);
    const Posts: IPost[] = await userPostsModel(user[0].user_id);
    const data = {
      profile: profile[0],
      data: { Likes, Posts },
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
