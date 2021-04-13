import {
  createComment,
  getComments,
  removeComment,
} from "../components/comments/commentControllter";
import {
  generateTokens,
  userAuthentication,
} from "../components/middleware/middlewareController";
import express, { Request, Response } from "express";
const router = express.Router();

router.post(
  "/createComment",
  userAuthentication,
  createComment,
  generateTokens,
  (req: Request, res: Response) => {
    res.sendStatus(200);
  }
);
router.get(
  "/getComments/:postId",
  userAuthentication,
  getComments,
  generateTokens
);
router.put("/removeComment", userAuthentication, removeComment, generateTokens);
export { router as commentsRouter };
