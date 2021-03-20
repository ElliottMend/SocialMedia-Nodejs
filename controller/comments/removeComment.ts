import { Request, Response } from "express";
import { removeCommentModel } from "../../models/comments/removeCommentModel";

export const removeComment = (req: Request, res: Response) => {
  try {
    if (!req.body.comment_id) res.sendStatus(400);
    removeCommentModel(req.body.comment_id);
    res.sendStatus(200);
  } catch {
    res.sendStatus(400);
  }
};
