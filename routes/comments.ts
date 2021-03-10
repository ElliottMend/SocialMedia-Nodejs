import { Request, Response, NextFunction } from "express";

const router = require("express").Router(),
  createComment = require("../controller/comments/createComment"),
  getComments = require("../controller/comments/getComments"),
  removeComment = require("../controller/comments/removeComments"),
  verify = require("../controller/userAuth/verify");
router.post(
  "/createComment",
  verify,
  createComment,
  async (req: Request, res: Response) => {}
);
router.get(
  "/getComments/:post_id",
  verify,
  getComments,
  async (req: Request, res: Response) => {}
);
router.put(
  "/removeComment",
  verify,
  removeComment,
  async (req: Request, res: Response) => {}
);
module.exports = router;
