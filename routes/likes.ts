import { addLikes } from "../controller/likes/addLikes";
import { removeLikes } from "../controller/likes/removeLikes";
import { verify } from "../controller/userAuth/verify";
import express from "express";
const router = express.Router();

router.put("/addlikes", verify, addLikes);
router.put("/removelikes", verify, removeLikes);
module.exports = router;
