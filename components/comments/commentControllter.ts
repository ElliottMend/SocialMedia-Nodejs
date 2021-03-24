import { Request, Response } from "express";
import {
  createCommentModel,
  getCommentModel,
  removeCommentModel,
} from "./comentModel";

export interface IQuery {
  body: string;
  date: Date;
  likes: number;
  commentId: number;
  userId: number;
  postId: number;
}

export const createComment = async (req: Request, res: Response) => {
  try {
    if (!req.body.text || !req.body.id) res.sendStatus(400);
    const comment: IQuery = await createCommentModel(
      req.body.text,
      res.locals.user,
      req.body.id
    );
    res.send(comment);
  } catch (err) {
    res.sendStatus(400);
  }
};

export const getComments = async (req: Request, res: Response) => {
  try {
    if (!req.params.postId) res.sendStatus(400);
    const comments = await getCommentModel(Number(req.params.postId));
    res.send(comments);
  } catch (err) {
    res.sendStatus(400);
  }
};

export const removeComment = (req: Request, res: Response) => {
  try {
    if (!req.body.commentId) res.sendStatus(400);
    removeCommentModel(req.body.commentId);
    res.sendStatus(200);
  } catch {
    res.sendStatus(400);
  }
};
