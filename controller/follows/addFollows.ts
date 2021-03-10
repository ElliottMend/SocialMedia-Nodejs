import { Request, Response, NextFunction } from "express";
import { addFollowModel } from "../../models/follows/addFollowModel";
const addFollows = async (req: Request, res: Response, next: NextFunction) => {
  try {
    addFollowModel(res.locals.user, req.body.author);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(400);
  }
};
module.exports = addFollows;
