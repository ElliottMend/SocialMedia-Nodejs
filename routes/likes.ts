import {
  addLikes,
  removeLikes,
  checkLiked,
} from "../components/likes/likesController";
import { userAuthentication } from "../components/middleware/userAuthentication";
import express from "express";
const router = express.Router();

router.put("/addlikes", userAuthentication, addLikes);
router.put("/removelikes", userAuthentication, removeLikes);
router.get("/checkliked/:postId", userAuthentication, checkLiked);
export { router as likesRouter };
