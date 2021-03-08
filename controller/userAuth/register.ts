import { Request, Response, NextFunction } from "express";
import { registerModel } from "../../models/userAuth/registerModel";
const bcrypt = require("bcrypt");

const register = async (req: Request, res: Response, next: NextFunction) => {
  const password: string = await bcrypt.hash(req.body.password, 10);
  const result = await registerModel(
    req.body.username,
    password,
    req.body.email,
    res
  );
  if (result) {
    res.send(result);
  } else {
    res.sendStatus(200);
  }
};
module.exports = register;
