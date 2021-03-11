import { Response } from "express";
import { register } from "../controller/userAuth/register";
import { login } from "../controller/userAuth/login";
import { logout } from "../controller/userAuth/logout";
import { verify } from "../controller/userAuth/verify";
import express from "express";
const router = express.Router();

router.post("/register", register, (res: Response) => {});
router.post("/login", login, () => {});
router.get("/logout", logout);
router.get("/verify", verify, async (res: Response) => {
  res.status(200).send();
});
module.exports = router;
