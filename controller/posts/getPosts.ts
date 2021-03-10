import { Request, Response } from "express";

import { getPostsModel } from "../../models/posts/getPostsModel";

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await getPostsModel(
      Number(req.params.radius),
      res.locals.user
    );
    res.send(posts);
  } catch (err) {
    res.sendStatus(400);
  }
};
