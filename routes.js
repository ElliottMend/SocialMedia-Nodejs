const express = require("express"),
  router = express.Router(),
  mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

require("./routes/comments")(router);
require("./routes/follows")(router);
require("./routes/likes")(router);
require("./routes/posts")(router);
require("./routes/user")(router);
require("./routes/userAuth")(router);

module.exports = router;
