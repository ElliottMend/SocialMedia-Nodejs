import { Request, Response, NextFunction } from "express";

const User = require("../models/users");
const findUser = async (user: string) => {
  const users = await User.findOne({ username: user });
  return users;
};
module.exports = findUser;
