import { Request, Response } from "express";
import { secrets } from "../../app";
export const userEditLocation = (req: Request, res: Response) => {
  res.send(secrets.REACT_PLACES_API_KEY);
};
