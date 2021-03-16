import { Request, Response } from "express";
import { checkLikedModel } from "../../models/likes/checkLikedModel";
interface IQuery {
  user_id: number;
  post_id: number;
}
export const checkLiked = async (req: Request, res: Response) => {
  try {
    const data: IQuery[] = await checkLikedModel(
      res.locals.user,
      Number(req.params.post_id)
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
