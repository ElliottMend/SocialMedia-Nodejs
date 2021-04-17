import {
  generateTokens,
  userAuthentication,
} from "../components/middleware/middlewareController";
import express from "express";
import {
  deleteNotification,
  getNotifications,
  updateNotifications,
} from "../components/notifications/notificationsController";
const router = express.Router();

router.get(
  "/getNotifications",
  userAuthentication,
  getNotifications,
  generateTokens
);

router.put(
  "/updateNotifications",
  userAuthentication,
  updateNotifications,
  generateTokens
);

router.delete(
  "/deleteNotifications",
  userAuthentication,
  deleteNotification,
  generateTokens
);
export { router as notificationRouter };
