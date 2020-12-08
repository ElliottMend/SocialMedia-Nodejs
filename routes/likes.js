const router = require("express").Router(),
  addLike = require("../controller/likes/addLike"),
  checkLike = require("../controller/likes/checkLikes"),
  removeLike = require("../controller/likes/removeLike"),
  verify = require("../controller/userAuth/verify");

router.put("/like", verify, addLike, async (req, res) => {});
router.get("/checklike", verify, checkLike, async (req, res) => {});
router.put("/unlike", verify, removeLike, async (req, res) => {});
module.exports = router;
