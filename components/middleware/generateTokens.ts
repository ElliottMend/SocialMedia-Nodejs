import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { secrets } from "../../app";
export interface IToken {
  httpOnly: boolean;
  maxAge: number;
  secure: boolean;
  sameSite: "none";
}
export const generateTokens = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.locals.skipGenerate) res.send(res.locals.send);
  const accessCookie: string = jwt.sign(
    {
      userID: res.locals.userId,
      username: res.locals.username,
    },
    secrets.ACCESS_TOKEN
  );
  const accessToken: IToken = {
    httpOnly: true,
    maxAge: 3600000,
    secure: secrets.SECURE === "false" ? false : true,
    sameSite: "none",
  };
  res.cookie("AccessToken", accessCookie, accessToken);

  if (res.locals.skipRefresh) res.send(res.locals.send);

  const refreshCookie: string = jwt.sign(
    {
      userID: res.locals.userId,
      username: res.locals.username,
    },
    secrets.REFRESH_TOKEN
  );

  const refreshToken: IToken = {
    httpOnly: true,
    maxAge: 259200000,
    secure: secrets.SECURE === "false" ? false : true,
    sameSite: "none",
  };
  res.cookie("RefreshToken", refreshCookie, refreshToken);
  res.send(res.locals.send);
};
