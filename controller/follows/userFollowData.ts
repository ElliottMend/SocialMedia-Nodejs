import { Request, Response } from "express";
import { followingDataModel } from "../../models/follows/followingDataModel";
import { followerDataModel } from "../../models/follows/followerDataModel";
interface IQuery {
  username: string;
  location: string;
  bio: string;
  photo: string;
}
export const userFollowData = async (req: Request, res: Response) => {
  let result: IQuery[];
  if (req.params.follow == "followers") {
    result = await followerDataModel(req.params.username);
  } else {
    result = await followingDataModel(req.params.username);
  }
  res.send(result);
};
