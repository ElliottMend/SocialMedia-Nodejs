import { Request, Response, NextFunction } from "express";
import { userProfileModel } from "../../models/userProfile/userProfileModel";
const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await userProfileModel(req.params.username, res);
    res.send(data);
  } catch (err) {
    res.sendStatus(400);
  }
};
module.exports = getUserProfile;
