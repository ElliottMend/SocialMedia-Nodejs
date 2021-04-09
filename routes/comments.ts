import {
  createComment,
  getComments,
  removeComment,
} from "../components/comments/commentControllter";
import { userAuthentication } from "../components/middleware/userAuthentication";
import express from "express";
const router = express.Router();

router.post("/createComment", userAuthentication, createComment);
router.get("/getComments/:postId", userAuthentication, getComments);
router.put("/removeComment", userAuthentication, removeComment);
export { router as commentsRouter };
