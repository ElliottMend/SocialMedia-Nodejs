import { getPosts } from "../controller/posts/getPosts";
import { newPost } from "../controller/posts/newPost";
import { removePost } from "../controller/posts/removePost";
import { verify } from "../controller/userAuth/verify";
import express from "express";
const router = express.Router();

router.post("/newpost", verify, newPost, () => {});
router.get("/getPosts/:radius", verify, getPosts);
router.put("/removePost", verify, removePost);
module.exports = router;
