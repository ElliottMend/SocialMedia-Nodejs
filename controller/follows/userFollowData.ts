import { Request, Response } from "express";
import { followingDataModel } from "../../models/follows/followingDataModel";
import { followerDataModel } from "../../models/follows/followerDataModel";
export const userFollowData = async (req: Request, res: Response) => {
  let result = null;
  if (req.params.follow == "followers") {
    result = await followerDataModel(req.params.username);
  } else {
    result = followingDataModel(req.params.username);
  }
  res.send(result);
};
