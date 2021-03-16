import { Request, Response } from "express";
import { getCommentModel } from "../../models/comments/getCommentModel";

export const getComments = async (req: Request, res: Response) => {
  try {
    const comments = await getCommentModel(Number(req.params.post_id));
    res.send(comments);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
