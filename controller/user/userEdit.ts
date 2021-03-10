import { Request, Response } from "express";
import { editProfileModel } from "../../models/userProfile/editProfileModel";
export const userEdit = async (req: Request, res: Response) => {
  try {
    await editProfileModel(
      req.body.latlng,
      req.body.location,
      res.locals.user,
      req.body.image,
      req.body.bio
    );
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(400);
  }
};
