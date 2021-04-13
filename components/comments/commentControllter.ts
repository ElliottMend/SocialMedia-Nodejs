import { NextFunction, Request, Response } from "express";
import {
  createCommentModel,
  getCommentModel,
  removeCommentModel,
  checkUserCommentModel,
} from "./comentModel";

export interface IQuery {
  body: string;
  date: Date;
  likes: number;
  commentId: number;
  userId: number;
  postId: number;
}

export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.text || !req.body.id) res.sendStatus(400);
    const comment: IQuery = await createCommentModel(
      req.body.text,
      res.locals.user,
      req.body.id
    );
    res.locals.send = comment;
    next();
  } catch (err) {
    res.sendStatus(400);
  }
};

export const getComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.postId) res.sendStatus(400);
    const comments = await getCommentModel(Number(req.params.postId));
    res.locals.send = comments;
    next();
  } catch (err) {
    res.sendStatus(400);
  }
};

export const removeComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.commentId) res.sendStatus(400);
    const comment = await checkUserCommentModel(
      res.locals.user,
      req.body.commentId
    );
    if (!comment.rows[0]) throw 400;
    await removeCommentModel(req.body.commentId);
    next();
  } catch {
    res.sendStatus(400);
  }
};
