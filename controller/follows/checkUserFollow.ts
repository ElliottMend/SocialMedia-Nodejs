import { Request, Response, NextFunction } from "express";
import { checkUserFollowModel } from "../../models/follows/checkUserFollowModel";
const checkUserFollow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = await checkUserFollowModel(res.locals.user);
  res.send(data.length > 0 ? true : false);
};
module.exports = checkUserFollow;
