const router = require("express").Router(),
  getUser = require("../controller/user/getUser.js"),
  userEdit = require("../controller/user/userEdit"),
  findUsername = require("../controller/findUsername"),
  getUserProfile = require("../controller/user/getUserProfile"),
  verify = require("../controller/userAuth/verify");

router.put("/userEdit", verify, userEdit, async (req, res) => {});
router.get("/getUser", verify, getUser, async (req, res) => {});
router.post("/users/:id/", verify, getUserProfile, async (req, res) => {});
module.exports = router;
