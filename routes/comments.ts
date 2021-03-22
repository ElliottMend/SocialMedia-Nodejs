import { createComment } from "../controller/comments/createComment";
import { getComments } from "../controller/comments/getComments";
import { removeComment } from "../controller/comments/removeComment";
import { verify } from "../controller/middleware/userAuthentication";
import express from "express";
export const router = express.Router();

router.post("/createComment", verify, createComment);
router.get("/getComments/:postId", verify, getComments);
router.put("/removeComment", verify, removeComment);
module.exports = router;
