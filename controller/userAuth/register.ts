import { Request, Response } from "express";
import { registerModel } from "../../models/userAuth/registerModel";
import bcrypt from "bcrypt";
import { registerSelectModel } from "../../models/userAuth/registerSelectModel";
export interface ISelectQuery {
  username: string;
}
const stringHasNumbers = (inputString: string) => {
  const regex = /\d/g;
  return regex.test(inputString);
};
export const register = async (req: Request, res: Response) => {
  if (!req.body.password || !req.body.email || !req.body.username) {
    return res.status(400).send({ message: "Missing login information" });
  }
  if (req.body.password.length < 5 || !stringHasNumbers(req.body.password)) {
    return res.status(400).send({
      message:
        "Password length should be at least 5 characters and contain a number",
    });
  }
  if (!req.body.email.includes("@") || !req.body.email.includes(".")) {
    return res.status(400).send({ message: "Email is incorrect format" });
  }
  const password: string = await bcrypt.hash(req.body.password, 10);
  const user: ISelectQuery[] | undefined = await registerSelectModel(
    req.body.username,
    req.body.email
  );
  if (user.length > 0) {
    res.status(400).send(user);
  } else {
    await registerModel(req.body.username, password, req.body.email);
    res.sendStatus(200);
  }
};
