import { NextFunction, Request, Response } from "express";
import { addLikesModel, checkLikedModel, removeLikesModel } from "./likesModel";

export const changeLike = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await checkLikedModel(res.locals.user, req.body.id);
    if (data[0]) await removeLikesModel(res.locals.user, req.body.id);
    else await addLikesModel(res.locals.user, req.body.id);
    next();
  } catch (err) {
    res.sendStatus(400);
  }
};
export const checkLiked = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await checkLikedModel(
      res.locals.user,
      Number(req.params.postId)
    );
    if (data[0]) {
      res.locals.send = "liked";
    }
    next();
  } catch {
    res.sendStatus(400);
  }
};
