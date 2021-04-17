import { Request, Response, NextFunction } from "express";
import {
  deleteNotificationModel,
  getNotificationsModel,
  updateNotificationsModel,
  validNotificationModel,
} from "./notificationModel";

export const validNotification = async (
  receiving_user: number,
  notificationId: number
) => {
  const check = await validNotificationModel(receiving_user, notificationId);
  if (!check[0]) throw "Incorrect notification";
  else return check;
};

export const getNotifications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const notifications = await getNotificationsModel(res.locals.user);
  res.locals.send = notifications;
  next();
};

export const updateNotifications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await updateNotificationsModel(req.body.notifications);
  next();
};

export const deleteNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await deleteNotificationModel(req.body.notiicationId);
  next();
};
