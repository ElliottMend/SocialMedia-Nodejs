const router = require("express").Router(),
  getPosts = require("../controller/posts/getPosts"),
  newPost = require("../controller/posts/newPost"),
  removePost = require("../controller/posts/removePost"),
  verify = require("../controller/userAuth/verify");

router.post("/newpost", verify, newPost, async (req, res) => {});
router.post("/locationPosts", verify, getPosts, async (req, res) => {});
router.put("/removePost", verify, removePost, async (req, res) => {});
module.exports = router;
