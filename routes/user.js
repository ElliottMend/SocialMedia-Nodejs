const router = require("express").Router(),
  getUser = require("../controller/user/getUser.js"),
  userEdit = require("../controller/user/userEdit"),
  findUsername = require("../controller/findUsername"),
  getUserProfile = require("../controller/user/getUserProfile");

router.put("/userEdit", userEdit, async (req, res) => {});
router.get("/getUser", getUser, async (req, res) => {
  
});
router.post("/users/:id/", getUserProfile, async (req, res) => {});
module.exports = router;
