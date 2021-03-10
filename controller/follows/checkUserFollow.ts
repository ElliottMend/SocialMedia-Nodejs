import { Response } from "express";
import { checkUserFollowModel } from "../../models/follows/checkUserFollowModel";
export const checkUserFollow = async (res: Response) => {
  const data = await checkUserFollowModel(res.locals.user);
  res.send(data.length > 0 ? true : false);
};
