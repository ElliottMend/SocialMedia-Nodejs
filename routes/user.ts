import { Request, Response } from "express";
import {
  getUserEdit,
  getUserProfile,
  userEdit,
  userEditLocation,
} from "../components/userProfile/userController";
import { userAuthentication } from "../components/modules/userAuthentication";
import express from "express";
const router = express.Router();

router.put("/userEdit", userAuthentication, userEdit);
router.get("/users/:username", getUserProfile);
router.get("/getUserEdit", userAuthentication, getUserEdit);
router.get("/checkJWT", userAuthentication, (req: Request, res: Response) => {
  res.send(res.locals.username);
});
router.get("/userEditLocation", userAuthentication, userEditLocation);
export { router as userRouter };
