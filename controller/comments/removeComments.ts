import { Request, Response, NextFunction } from "express";
import { removeCommentModel } from "../../models/comments/removeCommentModel";

const removeComments = (req: Request, res: Response, next: NextFunction) => {
  try {
    removeCommentModel(req.body.id);
    res.sendStatus(200);
  } catch {
    res.sendStatus(400);
  }
};
module.exports = removeComments;
