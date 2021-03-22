import { Request, Response } from "express";
import { followSuggestionsModel } from "../../models/follows/followSuggestionsModel";
export interface IQuery {
  location: string;
  username: string;
  postId: number;
  body: string;
  date: Date;
  userId: number;
  likes: number;
}
export const followSuggestions = async (req: Request, res: Response) => {
  try {
    const data: IQuery[] = await followSuggestionsModel(res.locals.user);
    res.send(data);
  } catch (err) {
    res.sendStatus(400);
  }
};
