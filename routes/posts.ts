import { Request, Response, NextFunction } from "express";

const router = require("express").Router(),
  getPosts = require("../controller/posts/getPosts"),
  newPost = require("../controller/posts/newPost"),
  // removePost = require("../controller/posts/removePost"),
  verify = require("../controller/userAuth/verify");

router.post(
  "/newpost",
  verify,
  newPost,
  async (req: Request, res: Response) => {}
);
router.post(
  "/getPosts",
  verify,
  getPosts,
  async (req: Request, res: Response) => {}
);
// router.put(
//   "/removePost",
//   verify,
//   removePost,
//   async (req: Request, res: Response) => {}
// );
module.exports = router;
