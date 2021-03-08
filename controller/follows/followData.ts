import { Request, Response, NextFunction } from "express";

const findUsername = require("../findUsername");
const followData = (req: Request, res: Response, next: NextFunction) => {
  let arr: any[] = [];
  Promise.all(
    req.body.users.map(async (e: any) => {
      const users = await findUsername(e);
      arr.push({
        photo: users.photo,
        bio: users.bio,
        username: users.username,
      });
    })
  ).then((re) => res.send(arr));
};
module.exports = followData;
