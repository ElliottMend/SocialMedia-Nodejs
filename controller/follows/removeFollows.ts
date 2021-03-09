import { Request, Response, NextFunction } from "express";
import { removeFollowModel } from "../../models/follows/removeFollowModel";
const removeFollows = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    removeFollowModel(res.locals.user, req.body.author);

    res.status(200).send();
  } catch (err) {
    res.status(400).send({ message: "There was an error" });
  }
};
module.exports = removeFollows;
