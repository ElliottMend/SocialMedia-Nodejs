const router = require("express").Router(),
  addFollow = require("../controller/follows/addFollows"),
  removeFollow = require("../controller/follows/removeFollows"),
  getFollow = require("../controller/follows/getFollows"),
  checkFollow = require("../controller/follows/checkFollow"),
  followData = require("../controller/follows/followData"),
  verify = require("../controller/userAuth/verify");

router.put("/addFollow", verify, addFollow, async (req, res) => {});
router.put("/removeFollow", verify, removeFollow, async (req, res) => {});
router.get("/checkFollow/:username", verify, checkFollow, async (req, res) => {});
router.post("/followData", verify, followData, async (req, res) => {});
router.get("/follows", verify, getFollow, async (req, res) => {});
module.exports = router;
