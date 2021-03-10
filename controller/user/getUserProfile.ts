import { Request, Response, NextFunction } from "express";
import { userLikesModel } from "../../models/userProfile/userLikesModel";
import { userPostsModel } from "../../models/userProfile/userPostsModel";
import { userProfileModel } from "../../models/userProfile/userProfileModel";
const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const profile = await userProfileModel(req.params.username);
    const likes = await userLikesModel(req.params.username);
    const posts = await userPostsModel(req.params.username);
    const data = {
      profile,
      likes,
      posts,
    };
    res.send(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
module.exports = getUserProfile;
