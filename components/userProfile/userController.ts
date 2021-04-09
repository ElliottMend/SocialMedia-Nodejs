import { Request, Response } from "express";
import { secrets } from "../../app";
import {
  userProfileModel,
  userPostsModel,
  userEditModel,
  userLikesModel,
  editProfileModel,
} from "./userModel";
export interface IQuery {
  latlng: { lat: number; lng: number };
  location: string;
  bio: string;
  photo: string;
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

export const getUserEdit = async (req: Request, res: Response) => {
  const data: IQuery = await userEditModel(res.locals.user);
  res.send({
    bio: data.bio,
    latlng: data.latlng,
    image: data.photo,
    location: data.location,
  });
};

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const profile: IProfile[] = await userProfileModel(req.params.username);
    const Likes: IPost[] = await userLikesModel(req.params.username);
    const Posts: IPost[] = await userPostsModel(req.params.username);
    const data = {
      profile,
      data: { Likes, Posts },
    };
    res.send(data);
  } catch (err) {
    res.sendStatus(400);
  }
};

export const userEdit = async (req: Request, res: Response) => {
  try {
    await editProfileModel(
      req.body.latlng,
      req.body.location,
      res.locals.user,
      req.body.image,
      req.body.bio
    );
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(400);
  }
};

export const userEditLocation = (req: Request, res: Response) => {
  res.send(secrets.REACT_PLACES_API_KEY);
};
