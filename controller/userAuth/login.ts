import { Request, Response, NextFunction } from "express";
import { loginModel } from "../../models/userAuth/loginModel";
const bcrypt = require("bcrypt"),
  generateAccessToken = require("./generateAccessToken");
const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await loginModel(req.body.email, res);
    bcrypt.compare(
      req.body.password,
      user.password,
      async (error: Error, bcryptResult: Boolean) => {
        if (bcryptResult) {
          await generateAccessToken(user.user_id, user.email, res);
          res.sendStatus(200);
        }
      }
    );
  } catch (err) {
    res.sendStatus(400);
  }
};
module.exports = login;
