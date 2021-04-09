import { Request, Response } from "express";
import {
  register,
  login,
  logout,
} from "../components/userAuth/userAuthController";
import { checkBodyData } from "../components/middleware/checkBodyData";
import { userAuthentication } from "../components/middleware/userAuthentication";
import express from "express";
const router = express.Router();

router.post("/register", checkBodyData, register);
router.post("/login", checkBodyData, login);
router.get("/logout", logout);
router.get(
  "/verify",
  userAuthentication,
  async (req: Request, res: Response) => {
    res.sendStatus(200);
  }
);
export { router as userAuthRouter };
