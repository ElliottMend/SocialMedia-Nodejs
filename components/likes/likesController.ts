import { Request, Response } from "express";
import { addLikesModel, checkLikedModel, removeLikesModel } from "./likesModel";
export const addLikes = async (req: Request, res: Response) => {
  try {
    await addLikesModel(res.locals.user, req.body.id);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(400);
  }
};

interface IQuery {
  userId: number;
  postId: number;
}
export const checkLiked = async (req: Request, res: Response) => {
  try {
    const data: IQuery[] = await checkLikedModel(
      res.locals.user,
      Number(req.params.postId)
    );
    if (data.length > 0) {
      res.send("liked");
    } else {
      res.sendStatus(200);
    }
  } catch {
    res.sendStatus(400);
  }
};
export const removeLikes = async (req: Request, res: Response) => {
  try {
    await removeLikesModel(res.locals.user, req.body.id);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(400);
  }
};
