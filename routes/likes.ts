import { addLikes } from "../controller/likes/addLikes";
import { removeLikes } from "../controller/likes/removeLikes";
import { verify } from "../controller/middleware/userAuthentication";
import { checkLiked } from "../controller/likes/checkLiked";
import express from "express";
export const router = express.Router();

router.put("/addlikes", verify, addLikes);
router.put("/removelikes", verify, removeLikes);
router.get("/checkliked/:postId", verify, checkLiked);
module.exports = router;
