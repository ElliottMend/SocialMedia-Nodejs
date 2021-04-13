import {
  getPosts,
  newPost,
  removePost,
} from "../components/posts/postController";
import {
  generateTokens,
  userAuthentication,
} from "../components/middleware/middlewareController";
import express from "express";
const router = express.Router();

router.post("/newPost", userAuthentication, newPost, generateTokens);
router.get("/getPosts/:radius", userAuthentication, getPosts, generateTokens);
router.put("/removePost", userAuthentication, removePost, generateTokens);
router.get("/getReplies/:postId");
export { router as postsRouter };
