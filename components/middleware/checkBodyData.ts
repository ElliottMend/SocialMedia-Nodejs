import { NextFunction, Request, Response } from "express";

export const checkBodyData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Object.values(req.body).forEach((value) => {
    if (!value) {
      res.sendStatus(403);
    }
  });
  next();
};
