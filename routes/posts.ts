import {
  getPosts,
  newPost,
  removePost,
} from "../components/posts/postController";
import { userAuthentication } from "../components/modules/userAuthentication";
import express from "express";
const router = express.Router();

router.post("/newpost", userAuthentication, newPost);
router.get("/getPosts/:radius", userAuthentication, getPosts);
router.put("/removePost", userAuthentication, removePost);
router.get("/getReplies/:postId");
export { router as postsRouter };
