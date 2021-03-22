import { Request, Response } from "express";
import { createCommentModel } from "../../models/comments/createCommentModel";
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
