import { Request, Response, NextFunction } from "express";

const router = require("express").Router(),
  userEdit = require("../controller/user/userEdit"),
  getUserProfile = require("../controller/user/getUserProfile"),
  verify = require("../controller/userAuth/verify"),
  getUserEdit = require("../controller/user/getUserEdit");

router.put(
  "/userEdit",
  verify,
  userEdit,
  async (req: Request, res: Response) => {}
);
router.get(
  "/users/:username",
  verify,
  getUserProfile,
  async (req: Request, res: Response) => {}
);
router.get("/checkJWT", verify, (req: Request, res: Response) => {
  res.send(res.locals.username);
});
router.get("/getUserEdit", verify, getUserEdit, () => {});
module.exports = router;
