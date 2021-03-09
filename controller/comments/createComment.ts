import { Request, Response, NextFunction } from "express";
import { createCommentModel } from "../../models/comments/createCommentModel";
const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await createCommentModel(req.body.text, res.locals.user, req.body.id);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(400);
  }
};
module.exports = createComment;
