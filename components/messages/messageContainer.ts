import { Request, Response, NextFunction } from "express";
import {
  createMessageRoomModel,
  createRoomInviteModel,
  getMessageRoomsModel,
  acceptRoomInviteModel,
  validRoomModel,
  sendMessageModel,
  getMessagesModel,
} from "./messageModel";
import { validNotification } from "../notifications/notificationsController";

export const createMessageRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let roomName: string = req.body.roomName
    ? req.body.roomName
    : res.locals.username;

  const room = await createMessageRoomModel(
    res.locals.user,
    roomName,
    req.body.roomName
  );
  if (req.body.invites)
    await createRoomInviteModel(
      res.locals.user,
      req.body.invites,
      room[0].room_id
    );
  next();
};

export const getMessageRooms = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const rooms = await getMessageRoomsModel(res.locals.user);
  res.locals.send = rooms;
  next();
};

export const acceptRoomInvite = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const roomId = await validNotification(
      res.locals.user,
      req.body.notificationId
    );
    if (!roomId[0]) throw 400;
    else {
      await acceptRoomInviteModel(
        res.locals.user,
        roomId[0].notification_message
      );
      next();
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const validRoom = async (roomId: string, userId: number) => {
  const room = await validRoomModel(roomId, userId);
  if (!room[0]) {
    return Promise.reject("User is not in room");
  } else return room;
};

export const sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await validRoom(req.body.roomId, res.locals.user);
    await sendMessageModel(res.locals.user, req.body.roomId, req.body.message);
    next();
  } catch (err) {
    res.send(err).status(400);
  }
};

export const getMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await validRoomModel(req.params.roomId, res.locals.user);
    const messages = await getMessagesModel(req.params.roomId);
    res.locals.send = messages;
    next();
  } catch (err) {
    res.send(err).status(400);
  }
};
