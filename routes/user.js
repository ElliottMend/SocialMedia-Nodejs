const router = require("express").Router(),
  userEdit = require("../controller/user/userEdit"),
  getUserProfile = require("../controller/user/getUserProfile"),
  verify = require("../controller/userAuth/verify"),
  getUserLikes = require("../controller/user/getUserLikes"),
  getUserEdit = require("../controller/user/getUserEdit");

router.put("/userEdit", verify, userEdit, async (req, res) => {});
router.get("/users/:username", verify, getUserProfile, async (req, res) => {});
router.get("/checkJWT", verify, (req, res) => {
  res.send(res.locals.username);
});
router.get("/getUserEdit", verify, getUserEdit, () => {});
router.get("/getUserLikes/:username", verify, getUserLikes, () => {});
module.exports = router;
