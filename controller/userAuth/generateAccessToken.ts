import { Response } from "express";
import jwt from "jsonwebtoken";
import { secrets } from "../../app";
interface IToken {
  httpOnly: boolean;
  maxAge: number;
  secure: boolean;
  sameSite: "none";
}
export const generateAccessToken = (
  user_id: number,
  username: string,
  res: Response
) => {
  const accessCookie = jwt.sign(
    {
      userID: user_id,
      username: username,
    },
    secrets.ACCESS_TOKEN
  );
  const refreshCookie = jwt.sign(
    {
      userID: user_id,
      username: username,
    },
    secrets.REFRESH_TOKEN
  );
  const accessToken: IToken = {
    httpOnly: true,
    maxAge: 3600000,
    secure: secrets.SECURE === "false" ? false : true,
    sameSite: "none",
  };
  const refreshToken: IToken = {
    httpOnly: true,
    maxAge: 259200000,
    secure: secrets.SECURE === "false" ? false : true,
    sameSite: "none",
  };
  res.cookie("AccessToken", accessCookie, accessToken);
  res.cookie("RefreshToken", refreshCookie, refreshToken);
  return;
};
