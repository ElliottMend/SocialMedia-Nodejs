const router = require("express").Router(),
  getPosts = require("../controller/posts/getPosts"),
  newPost = require("../controller/posts/newPost"),
  removePost = require("../controller/posts/removePost");

router.post("/newpost", newPost, async (req, res) => {});
router.post("/locationPosts", getPosts, async (req, res) => {});
router.put("/removePost", removePost, async (req, res) => {});
module.exports = router;
