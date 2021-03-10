import { Request, Response, NextFunction } from "express";

import { getPostsModel } from "../../models/posts/getPostsModel";

const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await getPostsModel(req.body.radius, res.locals.user);
    res.send(posts);
  } catch (err) {
    res.sendStatus(400);
  }
};
module.exports = getPosts;
