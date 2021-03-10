import { Request, Response, NextFunction } from "express";
import { followingDataModel } from "../../models/follows/followingDataModel";
import { followerDataModel } from "../../models/follows/followerDataModel";
const followData = async (req: Request, res: Response, next: NextFunction) => {
  let result = null;
  if (req.params.follow == "followers") {
    result = await followerDataModel(req.params.username);
  } else {
    result = followingDataModel(req.params.username);
  }
  res.send(result);
};
module.exports = followData;
