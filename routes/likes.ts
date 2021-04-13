import { changeLike, checkLiked } from "../components/likes/likesController";
import {
  generateTokens,
  userAuthentication,
} from "../components/middleware/middlewareController";
import express from "express";
const router = express.Router();

router.put("/changeLike", userAuthentication, changeLike, generateTokens);
router.get(
  "/checkliked/:postId",
  userAuthentication,
  checkLiked,
  generateTokens
);
export { router as likesRouter };
