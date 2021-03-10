import { Response } from "express";
import { followSuggestionsModel } from "../../models/follows/followSuggestionsModel";

export const followSuggestions = async (res: Response) => {
  try {
    const data = await followSuggestionsModel(res.locals.user);
    res.send(data);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};
