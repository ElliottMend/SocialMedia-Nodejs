import { Request, Response } from "express";
import { userLikesModel } from "../../models/userProfile/userLikesModel";
import { userPostsModel } from "../../models/userProfile/userPostsModel";
import { userProfileModel } from "../../models/userProfile/userProfileModel";
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
