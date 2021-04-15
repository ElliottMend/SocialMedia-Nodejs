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
    const comment: IQuery[] = await createCommentModel(
      req.body.text,
      res.locals.user,
      req.body.id
    );
    res.locals.send = comment[0];
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
    const comments: IQuery[] = await getCommentModel(Number(req.params.postId));
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
    const comment: IQuery[] = await checkUserCommentModel(
      res.locals.user,
      req.body.commentId
    );
    if (!comment[0]) throw 400;
    await removeCommentModel(req.body.commentId);
    next();
  } catch (err) {
    res.sendStatus(400);
  }
};
