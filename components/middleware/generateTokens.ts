import jwt from "jsonwebtoken";
import { secrets } from "../../app";
export interface IToken {
  httpOnly: boolean;
  maxAge: number;
  secure: boolean;
  sameSite: "none";
}
export const generateTokens = (userId: number, username: string) => {
  const accessCookie: string = jwt.sign(
    {
      userID: userId,
      username,
    },
    secrets.ACCESS_TOKEN
  );

  const refreshCookie: string = jwt.sign(
    {
      userID: userId,
      username,
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
  return {
    access: { name: "AccessToken", value: accessCookie, options: accessToken },
    refresh: {
      name: "RefreshToken",
      value: refreshCookie,
      options: refreshToken,
    },
  };
};
