import { Request, Response } from "express";
import { getCommentModel } from "../../models/comments/getCommentModel";

export const getComments = async (req: Request, res: Response) => {
  try {
    if (!req.params.postId) res.sendStatus(400);
    const comments = await getCommentModel(Number(req.params.postId));
    res.send(comments);
  } catch (err) {
    res.sendStatus(400);
  }
};
