import { Request, Response } from "express";
import { register } from "../controller/userAuth/register";
import { login } from "../controller/userAuth/login";
import { logout } from "../controller/userAuth/logout";
import { verify } from "../controller/middleware/userAuthentication";
import express from "express";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/verify", verify, async (req: Request, res: Response) => {
  res.sendStatus(200);
});
export { router as userAuthRouter };
