import { getPosts } from "../controller/posts/getPosts";
import { newPost } from "../controller/posts/newPost";
import { removePost } from "../controller/posts/removePost";
import { verify } from "../controller/middleware/userAuthentication";
import express from "express";
export const router = express.Router();

router.post("/newpost", verify, newPost);
router.get("/getPosts/:radius", verify, getPosts);
router.put("/removePost", verify, removePost);
router.get("/getReplies/:postId");
module.exports = router;
