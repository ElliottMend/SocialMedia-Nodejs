import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { secrets } from "../../app";
export interface IToken {
  httpOnly: boolean;
  maxAge: number;
  secure: boolean;
  sameSite: "none";
}

interface IDecode {
  userID: number;
  username: string;
}

export interface IGenerate {
  access: { name: string; value: string; options: IToken };
  refresh: { name: string; value: string; options: IToken };
}

let decoded: IDecode;

// export const  = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {};

const generateValue = (username: string, userId: number, tokenType: string) => {
  return jwt.sign(
    {
      userID: userId,
      username: username,
    },
    secrets[tokenType]
  );
};

const generateOptions = (tokenType: string) => {
  const options: IToken = {
    httpOnly: true,
    maxAge: tokenType === "ACCESS_TOKEN" ? 3600000 : 259200000,
    secure: secrets.SECURE === "false" ? false : true,
    sameSite: "none",
  };
  return options;
};

export const generateTokens = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    res.send(res.locals.send);
  } else if (res.locals.skipGenerate) {
    res.send(res.locals.send);
  } else {
    const accessValue = generateValue(
      res.locals.username,
      res.locals.userId,
      "ACCESS_TOKEN"
    );
    const accessOptions = generateOptions("ACCESS_TOKEN");
    res.cookie("AccessToken", accessValue, accessOptions);
    if (!res.locals.skipRefresh) {
      const refreshValue = generateValue(
        res.locals.username,
        res.locals.userId,
        "ACCESS_TOKEN"
      );
      const refreshOptions = generateOptions("REFRESH_TOKEN");
      res.cookie("RefreshToken", refreshValue, refreshOptions);
    }
    if (res.locals.send) res.send(res.locals.send);
    else res.sendStatus(200);
  }
};

export const userAuthentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const inputData = [];
    if (Object.keys(req.body).length > 0) inputData.push(req.body);
    if (Object.keys(req.params).length > 0) inputData.push(req.params);
    inputData.forEach((value) => {
      if (!Object.values(value)[0]) {
        res.sendStatus(403);
      }
    });
    if (!res.headersSent) {
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
    }
  } catch (err) {
    res.sendStatus(401);
  }
};
