import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
interface IToken {
  httpOnly: boolean;
  maxAge: number;
  secure: boolean;
  sameSite: "none";
}
const generateAccessToken = (user_id: number, email: string, res: Response) => {
  const accessCookie = jwt.sign(
    {
      user: user_id,
      email: email,
    },
    process.env.ACCESS_TOKEN
  );
  const refreshCookie = jwt.sign(
    {
      user: user_id,
      email: email,
    },
    process.env.REFRESH_TOKEN
  );
  const accessToken: IToken = {
    httpOnly: true,
    maxAge: 3600000,
    secure: process.env.SECURE === "false" ? false : true,
    sameSite: "none",
  };
  const refreshToken: IToken = {
    httpOnly: true,
    maxAge: 259200000,
    secure: process.env.SECURE === "false" ? false : true,
    sameSite: "none",
  };
  res.cookie("AccessToken", accessCookie, accessToken);
  res.cookie("RefreshToken", refreshCookie, refreshToken);
  return;
};
module.exports = generateAccessToken;
