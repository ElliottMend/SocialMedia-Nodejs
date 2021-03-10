import { Response } from "express";

export const logout = (res: Response) => {
  res.clearCookie("RefreshToken", {
    httpOnly: true,
    secure: process.env.SECURE === "false" ? false : true,
    sameSite: "none",
  });
  res.clearCookie("AccessToken", {
    httpOnly: true,
    secure: process.env.SECURE === "false" ? false : true,
    sameSite: "none",
  });
  res.status(200).send();
};
