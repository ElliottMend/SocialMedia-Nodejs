import {
  addFollow,
  removeFollow,
  checkUserFollow,
  userFollowData,
  followSuggestions,
} from "../components/follows/followController";
import { userAuthentication } from "../components/modules/userAuthentication";
import express from "express";
const router = express.Router();

router.put("/addFollow", userAuthentication, addFollow);
router.put("/removeFollow", userAuthentication, removeFollow);
router.get("/checkFollow/:username", userAuthentication, checkUserFollow);
router.get("/users/:username/:follow", userAuthentication, userFollowData);
router.get("/followSuggestions", userAuthentication, followSuggestions);
export { router as followsRouter };
