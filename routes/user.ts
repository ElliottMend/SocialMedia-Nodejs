import { Request, Response } from "express";
import { getUserEdit } from "../controller/user/getUserEdit";
import { getUserProfile } from "../controller/user/getUserProfile";
import { verify } from "../controller/userAuth/verify";
import { userEdit } from "../controller/user/userEdit";
import { userEditLocation } from "../controller/user/userEditLocation";
import express from "express";
const router = express.Router();

router.put("/userEdit", verify, userEdit);
router.get("/users/:username", getUserProfile);
router.get("/getUserEdit", verify, getUserEdit);
router.get("/checkJWT", verify, (req: Request, res: Response) => {
  res.send(res.locals.username);
});
router.get("/userEditLocation", verify, userEditLocation);
module.exports = router;
