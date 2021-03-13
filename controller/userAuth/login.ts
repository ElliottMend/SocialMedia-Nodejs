import { Request, Response } from "express";
import { loginModel } from "../../models/userAuth/loginModel";
import bcrypt from "bcrypt";
import { generateAccessToken } from "./generateAccessToken";
interface IQuery {
  user_id: number;
  password: string;
  username: string;
}
export const login = async (req: Request, res: Response) => {
  try {
    const user: IQuery = await loginModel(req.body.email);
    bcrypt.compare(
      req.body.password,
      user.password,
      async (error: Error, bcryptResult: Boolean) => {
        if (bcryptResult) {
          await generateAccessToken(user.user_id, user.username, res);
          res.sendStatus(200);
        }
      }
    );
  } catch (err) {
    res.sendStatus(400);
  }
};
