import { Request, Response, NextFunction } from "express";
import { removeCommentModel } from "../../models/comments/removeCommentModel";

export const removeComment = (req: Request, res: Response) => {
  try {
    removeCommentModel(req.body.id);
    res.sendStatus(200);
  } catch {
    res.sendStatus(400);
  }
};
