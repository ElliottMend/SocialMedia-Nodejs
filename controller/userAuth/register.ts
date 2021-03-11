import { Request, Response } from "express";
import { registerModel } from "../../models/userAuth/registerModel";
import bcrypt from "bcrypt";
export interface ISelectQuery {
  username: string;
}
export const register = async (req: Request, res: Response) => {
  const password: string = await bcrypt.hash(req.body.password, 10);
  const result: ISelectQuery[] | undefined = await registerModel(
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
