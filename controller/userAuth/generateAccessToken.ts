import { Request, Response, NextFunction } from "express";

const jwt = require("jsonwebtoken");
const generateAccessToken = (user: string, email: string) => {
  const accessCookie = jwt.sign(
    {
      user: user,
      email: email,
    },
    process.env.ACCESS_TOKEN
  );
  const refreshCookie = jwt.sign(
    {
      user: user,
      email: email,
    },
    process.env.REFRESH_TOKEN
  );
  const accessToken = {
    httpOnly: true,
    maxAge: 3600000,
    secure: process.env.SECURE === "false" ? false : true,
    sameSite: "none",
  };
  const refreshToken = {
    httpOnly: true,
    maxAge: 259200000,
    secure: process.env.SECURE === "false" ? false : true,
    sameSite: "none",
  };
  return [accessCookie, refreshCookie, accessToken, refreshToken];
};
module.exports = generateAccessToken;
