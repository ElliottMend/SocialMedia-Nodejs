import { Request, Response, NextFunction } from "express";
import jwt, { decode } from "jsonwebtoken";
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
let decoded: IDecode;
export const userAuthentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    decoded = jwt.verify(
      req.cookies.AccessToken
        ? req.cookies.AccessToken
        : req.cookies.RefreshToken,
      secrets.ACCESS_TOKEN
    ) as IDecode;
    res.locals.skipGenerate = req.cookies.AccessToken;
    res.locals.skipRefresh = req.cookies.RefreshToken;
    res.locals.user = decoded.userID;
    res.locals.username = decoded.username;
    next();
  } catch {
    res.sendStatus(401);
  }
};
