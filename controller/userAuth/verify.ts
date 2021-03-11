import { Request, Response, NextFunction } from "express";
import { generateAccessToken } from "./generateAccessToken";
import jwt, { decode } from "jsonwebtoken";
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
    const decoded = jwt.verify(
      req.cookies.AccessToken,
      String(process.env.ACCESS_TOKEN)
    );
    res.locals.user = (<IDecode>decoded).userID;
    next();
  } else {
    if (req.cookies.RefreshToken) {
      const decoded = jwt.verify(
        req.cookies.RefreshToken,
        String(process.env.REFRESH_TOKEN)
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
