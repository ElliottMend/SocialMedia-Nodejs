import { Request, Response } from "express";
import { loginModel } from "../../models/userAuth/loginModel";
import bcrypt from "bcrypt";
import { generateAccessToken } from "./generateAccessToken";
interface IQuery {
  userId: number;
  password: string;
  username: string;
}
export const login = async (req: Request, res: Response) => {
  try {
    const user: IQuery = await loginModel(req.body.email);
    bcrypt.compare(
      req.body.password,
      user.password,
      async (error: Error, bcryptResult: boolean) => {
        if (bcryptResult) {
          await generateAccessToken(user.userId, user.username, res);
          res.sendStatus(200);
        }
      }
    );
  } catch (err) {
    res.sendStatus(400);
  }
};
