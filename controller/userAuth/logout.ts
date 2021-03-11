import { Request, Response } from "express";
import { secrets } from "../../app";
export const logout = (req: Request, res: Response) => {
  res.clearCookie("RefreshToken", {
    httpOnly: true,
    secure: secrets.SECURE === "false" ? false : true,
    sameSite: "none",
  });
  res.clearCookie("AccessToken", {
    httpOnly: true,
    secure: secrets.SECURE === "false" ? false : true,
    sameSite: "none",
  });
  res.status(200).send();
};
