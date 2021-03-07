import { Request, Response, NextFunction } from "express";

const router = require("express").Router(),
  addLike = require("../controller/likes/addLike"),
  checkLike = require("../controller/likes/checkLikes"),
  removeLike = require("../controller/likes/removeLike"),
  verify = require("../controller/userAuth/verify");

router.put("/like", verify, addLike, async (req: Request, res: Response) => {});
router.get(
  "/checklike",
  verify,
  checkLike,
  async (req: Request, res: Response) => {}
);
router.put(
  "/unlike",
  verify,
  removeLike,
  async (req: Request, res: Response) => {}
);
module.exports = router;
