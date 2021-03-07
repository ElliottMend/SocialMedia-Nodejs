import { Request, Response, NextFunction } from "express";

const User = require("../../models/users"),
  findUsername = require("../findUsername");
const getuserEdit = async (req: Request, res: Response, next: NextFunction) => {
  const user = await findUsername(res.locals.username);
  res.send({ bio: user.bio, latlng: user.latlng, location: user.location });
};
module.exports = getuserEdit;
