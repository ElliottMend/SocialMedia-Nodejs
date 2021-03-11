import { createComment } from "../controller/comments/createComment";
import { getComments } from "../controller/comments/getComments";
import { removeComment } from "../controller/comments/removeComment";
import { verify } from "../controller/userAuth/verify";
import express from "express";
const router = express.Router();

router.post("/createComment", verify, createComment, () => {});
router.get("/getComments/:post_id", verify, getComments);
router.put("/removeComment", verify, removeComment);
module.exports = router;
