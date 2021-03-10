import { Request, Response } from "express";
import { registerModel } from "../../models/userAuth/registerModel";
const bcrypt = require("bcrypt");

export const register = async (req: Request, res: Response) => {
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
