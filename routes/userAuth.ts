import { Request, Response } from "express";
import {
  register,
  login,
  logout,
} from "../components/userAuth/userAuthController";
import { generateTokens } from "../components/middleware/generateTokens";
import { checkBodyData } from "../components/middleware/checkBodyData";
import { userAuthentication } from "../components/middleware/userAuthentication";
import express from "express";
const router = express.Router();

router.post("/register", checkBodyData, register);
router.post(
  "/login",
  checkBodyData,
  login,
  generateTokens,
  (req: Request, res: Response) => {
    res.sendStatus(200);
  }
);
router.get("/logout", logout);
router.get(
  "/verify",
  userAuthentication,
  generateTokens,
  async (req: Request, res: Response) => {
    res.sendStatus(200);
  }
);
router.get("/generateTokens", generateTokens);
export { router as userAuthRouter };
