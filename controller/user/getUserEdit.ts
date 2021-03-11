import { Response } from "express";
import { userEditModel } from "../../models/userProfile/useEditModel";
export interface IQuery {
  latlng: { lat: number; lng: number };
  location: string;
  bio: string;
  photo: string;
}
export const getUserEdit = async (res: Response) => {
  const data: IQuery = await userEditModel(res.locals.user);
  res.send({
    bio: data.bio,
    latlng: data.latlng,
    image: data.photo,
    location: data.location,
  });
};
