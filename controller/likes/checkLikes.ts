import { Request, Response, NextFunction } from "express";

const interactionID = require("../interactionId");
const checkLikes = async (req: Request, res: Response, next: NextFunction) => {
  const intID = await interactionID(res.locals.username);
  res.status(200).send(intID.likes.toString());
};
module.exports = checkLikes;
