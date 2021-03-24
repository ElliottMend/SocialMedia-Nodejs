import { Request, Response, NextFunction } from "express";
import { generateAccessToken } from "./generateTokens";
import jwt from "jsonwebtoken";
import { secrets } from "../../app";
interface IDecode {
  userID: number;
  username: string;
}
export const userAuthentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.cookies.AccessToken) {
    const decoded = jwt.verify(req.cookies.AccessToken, secrets.ACCESS_TOKEN);
    res.locals.user = (decoded as IDecode).userID;
    res.locals.username = (decoded as IDecode).username;
    next();
  } else {
    if (req.cookies.RefreshToken) {
      const decoded = jwt.verify(
        req.cookies.RefreshToken,
        secrets.REFRESH_TOKEN
      );
      const userID = (decoded as IDecode).userID;
      const username = (decoded as IDecode).username;
      generateAccessToken(userID, username, res);
      res.locals.user = userID;
      res.locals.username = username;
      next();
    } else {
      res.sendStatus(401);
    }
  }
};
