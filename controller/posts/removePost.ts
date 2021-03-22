import { Request, Response } from "express";
import { removePostModel } from "../../models/posts/removePostModel";
export const removePost = async (req: Request, res: Response) => {
  try {
    await removePostModel(req.body.id);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(400);
  }
};
