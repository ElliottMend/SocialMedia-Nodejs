import { Response, Request } from "express";
import { checkUserFollowModel } from "../../models/follows/checkUserFollowModel";
interface IQuery {
  following: string;
}
export const checkUserFollow = async (req: Request, res: Response) => {
  if (!req.params.username) res.sendStatus(400);
  const data: IQuery[] = await checkUserFollowModel(
    res.locals.user,
    req.params.username
  );
  res.send(data.length > 0 ? true : false);
};
