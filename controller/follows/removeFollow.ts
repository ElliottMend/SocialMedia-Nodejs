import { Request, Response } from "express";
import { removeFollowModel } from "../../models/follows/removeFollowModel";
export const removeFollow = async (req: Request, res: Response) => {
  try {
    removeFollowModel(res.locals.user, req.body.author);
    res.status(200).send();
  } catch (err) {
    res.status(400).send({ message: "There was an error" });
  }
};
