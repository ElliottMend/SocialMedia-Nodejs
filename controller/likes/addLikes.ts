import { Request, Response } from "express";
import { addLikesModel } from "../../models/likes/addLikesModel";
export const addLikes = async (req: Request, res: Response) => {
  try {
    await addLikesModel(res.locals.user, req.body.id);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(400);
  }
};
