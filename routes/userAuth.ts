import { Request, Response, NextFunction } from "express";

const router = require("express").Router(),
  register = require("../controller/userAuth/register"),
  login = require("../controller/userAuth/login"),
  verify = require("../controller/userAuth/verify"),
  logout = require("../controller/userAuth/logout");

router.post("/register", register, async (req: Request, res: Response) => {});
router.post("/login", login, async (req: Request, res: Response) => {});
router.get("/verify", verify, async (req: Request, res: Response) => {
  res.status(200).send();
});
router.get("/logout", logout, async (req: Request, res: Response) => {});
module.exports = router;
