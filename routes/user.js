const router = require("express").Router(),
  getUser = require("../controller/user/getUser.js"),
  userEdit = require("../controller/user/userEdit"),
  getUserProfile = require("../controller/user/getUserProfile"),
  verify = require("../controller/userAuth/verify");

router.put("/userEdit", verify, userEdit, async (req, res) => {});
router.get("/getUser", verify, getUser, async (req, res) => {});
router.get("/users/:username", verify, getUserProfile, async (req, res) => {});
router.get("/checkJWT", verify, (req, res) => {
  res.send(res.locals.username)
});
module.exports = router;
