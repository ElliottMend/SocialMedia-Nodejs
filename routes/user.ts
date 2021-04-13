import { Request, Response } from "express";
import {
  getUserEdit,
  getUserProfile,
  userEdit,
  userEditLocation,
} from "../components/userProfile/userController";
import {
  generateTokens,
  userAuthentication,
} from "../components/middleware/middlewareController";
import express from "express";
const router = express.Router();

router.put("/userEdit", userAuthentication, userEdit, generateTokens);
router.get("/users/:username", getUserProfile);
router.get("/getUserEdit", userAuthentication, getUserEdit, generateTokens);
router.get("/checkJWT", userAuthentication, (req: Request, res: Response) => {
  res.send(res.locals.username);
});
router.get(
  "/userEditLocation",
  userAuthentication,
  userEditLocation,
  generateTokens
);
export { router as userRouter };
