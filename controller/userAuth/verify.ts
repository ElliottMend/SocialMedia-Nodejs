import { Request, Response, NextFunction } from "express";

const generateAccessToken = require("./generateAccessToken"),
  jwt = require("jsonwebtoken");
const verify = async (req: Request, res: Response, next: NextFunction) => {
  if (req.cookies.AccessToken) {
    const decoded = await jwt.verify(
      req.cookies.AccessToken,
      process.env.ACCESS_TOKEN
    );
    res.locals.username = decoded.user;
    res.locals.status = 200;
    next();
  } else {
    if (req.cookies.RefreshToken) {
      const decoded = await jwt.verify(
        req.cookies.RefreshToken,
        process.env.REFRESH_TOKEN
      );
      const [accessToken] = await generateAccessToken(
        decoded.user,
        decoded.email
      );
      const accessCookie = {
        httpOnly: true,
        maxAge: 3600000,
        secure: process.env.SECURE === "false" ? false : true,
        sameSite: "none",
      };
      res.cookie("AccessToken", accessToken, accessCookie);
      res.locals.username = decoded.user;
      res.locals.access = accessToken;
      res.locals.status = 200;
      next();
    } else {
      res.status(401).send();
    }
  }
};
module.exports = verify;
