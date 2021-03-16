import { Request, Response } from "express";
import { createCommentModel } from "../../models/comments/createCommentModel";
export interface IQuery {
  body: string;
  date: Date;
  likes: number;
  comment_id: number;
  user_id: number;
  post_id: number;
}
export const createComment = async (req: Request, res: Response) => {
  try {
    const comment: IQuery = await createCommentModel(
      req.body.text,
      res.locals.user,
      req.body.id
    );
    res.send(comment);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
