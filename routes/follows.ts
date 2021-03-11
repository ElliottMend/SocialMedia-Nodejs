import { addFollow } from "../controller/follows/addFollow";
import { removeFollow } from "../controller/follows/removeFollow";
import { checkUserFollow } from "../controller/follows/checkUserFollow";
import { userFollowData } from "../controller/follows/userFollowData";
import { followSuggestions } from "../controller/follows/followSuggestions";
import { verify } from "../controller/userAuth/verify";
import express from "express";
const router = express.Router();

router.put("/addFollow", verify, addFollow);
router.put("/removeFollow", verify, removeFollow);
router.get("/checkFollow/:username", verify, checkUserFollow);
router.get("/users/:username/:follow", verify, userFollowData);
router.get("/followSuggestions", verify, followSuggestions);
module.exports = router;
