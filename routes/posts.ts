import {
  getPosts,
  newPost,
  removePost,
} from "../components/posts/postController";
import { userAuthentication } from "../components/middleware/userAuthentication";
import { generateTokens } from "../components/middleware/generateTokens";
import { checkBodyData } from "../components/middleware/checkBodyData";
import express from "express";
const router = express.Router();

router.post(
  "/newPost",
  checkBodyData,
  userAuthentication,
  newPost,
  generateTokens
);
router.get(
  "/getPosts/:radius",
  checkBodyData,
  userAuthentication,
  getPosts,
  generateTokens
);
router.put("/removePost", userAuthentication, removePost, generateTokens);
router.get("/getReplies/:postId");
export { router as postsRouter };
