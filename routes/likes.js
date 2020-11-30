const router = require("express").Router(),
  addLike = require("../controller/likes/addLike"),
  checkLike = require("../controller/likes/checkLikes"),
  removeLike = require("../controller/likes/removeLike");
  
router.put("/like", addLike, async (req, res) => {});
router.post("/checklike", checkLike, async (req, res) => {});
router.put("/unlike", removeLike, async (req, res) => {});
module.exports = router;
