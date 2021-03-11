import { Request, Response } from "express";
import { userLikesModel } from "../../models/userProfile/userLikesModel";
import { userPostsModel } from "../../models/userProfile/userPostsModel";
import { userProfileModel } from "../../models/userProfile/userProfileModel";
interface IPost {
  body: string;
  user_id: number;
  date: Date;
  likes: number;
  post_id: number;
}
interface IProfile extends IPost {
  location: string;
  username: string;
}
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const profile: IProfile[] = await userProfileModel(req.params.username);
    const likes: IPost[] = await userLikesModel(req.params.username);
    const posts: IPost[] = await userPostsModel(req.params.username);
    const data = {
      profile,
      likes,
      posts,
    };
    res.send(data);
  } catch (err) {
    res.sendStatus(400);
  }
};
