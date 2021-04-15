import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import {
  registerModel,
  loginModel,
  registerSelectModel,
} from "./userAuthModel";
import { secrets } from "../../app";

interface IQuery {
  user_id: number;
  password: string;
  username: string;
}

export interface ISelectQuery {
  username: string;
}

export const stringHasNumbers = (inputString: string) => {
  const regex = /\d/g;
  return regex.test(inputString);
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: IQuery[] = await loginModel(req.body.email);
    if (!user[0]) throw 400;
    bcrypt.compare(
      req.body.password,
      user[0].password,
      async (error: Error, bcryptResult: boolean) => {
        if (bcryptResult) {
          res.locals.userId = user[0].user_id;
          res.locals.username = user[0].username;
          next();
        } else {
          res.sendStatus(400);
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("RefreshToken", {
    httpOnly: true,
    secure: secrets.SECURE === "false" ? false : true,
    sameSite: "none",
  });
  res.clearCookie("AccessToken", {
    httpOnly: true,
    secure: secrets.SECURE === "false" ? false : true,
    sameSite: "none",
  });
  res.status(200).send();
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
