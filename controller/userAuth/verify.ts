import { Request, Response, NextFunction } from "express";
import { generateAccessToken } from "./generateAccessToken";
import jwt from "jsonwebtoken";
import { secrets } from "../../app";
interface IDecode {
  userID: number;
  username: string;
}
export const verify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.cookies.AccessToken) {
    const decoded = jwt.verify(req.cookies.AccessToken, secrets.ACCESS_TOKEN);
    res.locals.user = (<IDecode>decoded).userID;
    res.locals.username = (<IDecode>decoded).username;
    next();
  } else {
    if (req.cookies.RefreshToken) {
      const decoded = jwt.verify(
        req.cookies.RefreshToken,
        secrets.REFRESH_TOKEN
      );
      const userID = (<IDecode>decoded).userID;
      const username = (<IDecode>decoded).username;
      generateAccessToken(userID, username, res);
      res.locals.user = userID;
      res.locals.username = username;
      next();
    } else {
      res.sendStatus(401);
    }
  }
};
