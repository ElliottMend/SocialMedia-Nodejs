import { Request, Response } from "express";
import {
  register,
  login,
  logout,
} from "../components/userAuth/userAuthController";
import { userAuthentication } from "../components/modules/userAuthentication";
import express from "express";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get(
  "/verify",
  userAuthentication,
  async (req: Request, res: Response) => {
    res.sendStatus(200);
  }
);
export { router as userAuthRouter };
