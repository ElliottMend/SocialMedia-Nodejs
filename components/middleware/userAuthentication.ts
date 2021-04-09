import { Request, Response, NextFunction } from "express";
import { generateTokens } from "./generateTokens";
import jwt from "jsonwebtoken";
import { secrets } from "../../app";
import { IToken } from "./generateTokens";

interface IDecode {
  userID: number;
  username: string;
}

export interface IGenerate {
  access: { name: string; value: string; options: IToken };
  refresh: { name: string; value: string; options: IToken };
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
  } else if (req.cookies.RefreshToken) {
    const decoded = jwt.verify(req.cookies.RefreshToken, secrets.REFRESH_TOKEN);
    const userID = (decoded as IDecode).userID;
    const username = (decoded as IDecode).username;
    res.locals.user = userID;
    res.locals.username = username;
    const token: IGenerate = generateTokens(userID, username);
    res.cookie(token.access.name, token.access.value, token.access.options);
    res.cookie(token.access.name, token.access.value, token.access.options);
    next();
  } else {
    res.sendStatus(401);
  }
};
