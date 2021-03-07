import { Request, Response, NextFunction } from "express";

const router = require("express").Router(),
  addFollow = require("../controller/follows/addFollows"),
  removeFollow = require("../controller/follows/removeFollows"),
  getFollow = require("../controller/follows/getFollows"),
  checkFollow = require("../controller/follows/checkFollow"),
  followData = require("../controller/follows/followData"),
  verify = require("../controller/userAuth/verify");

router.put(
  "/addFollow",
  verify,
  addFollow,
  async (req: Request, res: Response) => {}
);
router.put(
  "/removeFollow",
  verify,
  removeFollow,
  async (req: Request, res: Response) => {}
);
router.get(
  "/checkFollow/:username",
  verify,
  checkFollow,
  async (req: Request, res: Response) => {}
);
router.post(
  "/followData",
  verify,
  followData,
  async (req: Request, res: Response) => {}
);
router.get(
  "/follows",
  verify,
  getFollow,
  async (req: Request, res: Response) => {}
);
module.exports = router;
