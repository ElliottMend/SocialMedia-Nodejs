import { Request, Response } from "express";
import { removeLikesModel } from "../../models/likes/removeLikesModel";
export const removeLikes = async (req: Request, res: Response) => {
  try {
    await removeLikesModel(res.locals.user, req.body.id);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(400);
  }
};
