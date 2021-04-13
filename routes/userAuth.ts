import { Request, Response } from "express";
import {
  register,
  login,
  logout,
} from "../components/userAuth/userAuthController";
import {
  generateTokens,
  userAuthentication,
} from "../components/middleware/middlewareController";
import express from "express";
const router = express.Router();

router.post("/register", register);
router.post("/login", login, generateTokens, (req: Request, res: Response) => {
  res.sendStatus(200);
});
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
