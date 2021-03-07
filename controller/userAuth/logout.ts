import { Request, Response, NextFunction } from "express";

const logout = (req: Request, res: Response, next: NextFunction) => {
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
module.exports = logout;
