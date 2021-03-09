import { Request, Response, NextFunction } from "express";
import { getFollowsModel } from "../../models/comments/getFollowsModel";

const getFollows = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getFollowsModel(res.locals.user);
    res.send(data);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};
module.exports = getFollows;
