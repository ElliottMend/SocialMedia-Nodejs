import { Request, Response, NextFunction } from "express";
import { editProfileModel } from "../../models/userProfile/editProfileModel";
const userEdit = async (req: Request, res: Response, next: NextFunction) => {
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
module.exports = userEdit;
