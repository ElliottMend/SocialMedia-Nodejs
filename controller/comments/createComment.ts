import { Request, Response, NextFunction } from "express";
import { createCommentModel } from "../../models/comments/createCommentModel";
export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const comment = await createCommentModel(
      req.body.text,
      res.locals.user,
      req.body.id
    );
    res.sendStatus(comment);
  } catch (err) {
    res.sendStatus(400);
  }
};
