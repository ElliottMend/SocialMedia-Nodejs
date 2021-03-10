import { Request, Response } from "express";
import { addFollowModel } from "../../models/follows/addFollowModel";
export const addFollow = async (req: Request, res: Response) => {
  try {
    addFollowModel(res.locals.user, req.body.author);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(400);
  }
};
