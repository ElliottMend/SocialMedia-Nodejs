import { Request, Response, NextFunction } from "express";
import { addLikes } from "../controller/likes/addLikes";
import { removeLikes } from "../controller/likes/removeLikes";
const router = require("express").Router(),
  verify = require("../controller/userAuth/verify");

router.put(
  "/addlikes",
  verify,
  addLikes,
  async (req: Request, res: Response) => {}
);
router.put(
  "/removelikes",
  verify,
  removeLikes,
  async (req: Request, res: Response) => {}
);
module.exports = router;
