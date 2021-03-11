import { Response } from "express";
import jwt from "jsonwebtoken";
interface IToken {
  httpOnly: boolean;
  maxAge: number;
  secure: boolean;
  sameSite: "none";
}
export const generateAccessToken = (
  user_id: number,
  email: string,
  res: Response
) => {
  const accessCookie = jwt.sign(
    {
      userID: user_id,
      username: email,
    },
    String(process.env.ACCESS_TOKEN)
  );
  const refreshCookie = jwt.sign(
    {
      userID: user_id,
      username: email,
    },
    String(process.env.REFRESH_TOKEN)
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
    secure: String(process.env.SECURE) === "false" ? false : true,
    sameSite: "none",
  };
  res.cookie("AccessToken", accessCookie, accessToken);
  res.cookie("RefreshToken", refreshCookie, refreshToken);
  return;
};
