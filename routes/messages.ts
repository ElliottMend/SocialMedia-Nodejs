import {
  generateTokens,
  userAuthentication,
} from "../components/middleware/middlewareController";
import express from "express";
import {
  acceptRoomInvite,
  createMessageRoom,
  getMessageRooms,
  getMessages,
  sendMessage,
} from "../components/messages/messageContainer";
const router = express.Router();

router.get(
  "/getMessageRooms",
  userAuthentication,
  getMessageRooms,
  generateTokens
);

router.post(
  "/createMessageRoom",
  userAuthentication,
  createMessageRoom,
  generateTokens
);
router.post("/sendMessage", userAuthentication, sendMessage, generateTokens);

router.post(
  "/acceptRoomInvite",
  userAuthentication,
  acceptRoomInvite,
  generateTokens
);
router.get(
  "/getMessages/:roomId",
  userAuthentication,
  getMessages,
  generateTokens
);
export { router as messageRouter };
