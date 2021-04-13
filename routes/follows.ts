import {
  checkUserFollow,
  userFollowData,
  followSuggestions,
  changeFollow,
} from "../components/follows/followController";
import {
  generateTokens,
  userAuthentication,
} from "../components/middleware/middlewareController";
import express from "express";
const router = express.Router();

router.put("/changeFollow", userAuthentication, changeFollow, generateTokens);
router.get(
  "/checkFollow/:username",
  userAuthentication,
  checkUserFollow,
  generateTokens
);
router.get(
  "/users/:username/:follow",
  userAuthentication,
  userFollowData,
  generateTokens
);
router.get(
  "/followSuggestions",
  userAuthentication,
  followSuggestions,
  generateTokens
);
export { router as followsRouter };
