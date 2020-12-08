const router = require("express").Router(),
  register = require("../controller/userAuth/register"),
  login = require("../controller/userAuth/login"),
  verify = require("../controller/userAuth/verify");

router.post("/register", register, async (req, res) => {});
router.post("/login", login, async (req, res) => {});
router.get("/verify", verify, async (req, res) => {
  res.status(200).send();
});
module.exports = router;
