const router = require("express").Router(),
  createComment = require("../controller/comments/createComment"),
  getComments = require("../controller/comments/getComments"),
  removeComment = require("../controller/comments/removeComments");

router.post("/createComment", createComment, async (req, res) => {});
router.post("/getComments", getComments, async (req, res) => {});
router.put("/removeComment", removeComment, async (req, res) => {});
module.exports = router;
