import { Request, Response, NextFunction } from "express";
import { getCommentModel } from "../../models/comments/getCommentModel";

export const getComments = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    getCommentModel(Number(req.params.post_id));
    res.sendStatus(200);
  } catch {
    res.sendStatus(400);
  }
};
