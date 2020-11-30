const express = require("express"),
  mongoose = require("mongoose"),
  app = express();
require("dotenv").config();
app.use(express.urlencoded({ limit: "50mb" }));

mongoose.set("useFindAndModify", false);
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(process.env.SERVER_URL, { useNewUrlParser: true }).then(() => {
  app.use(express.json());
  app.use(require("./routes/comments"));
  app.use(require("./routes/follows"));
  app.use(require("./routes/likes"));
  app.use(require("./routes/posts"));
  app.use(require("./routes/user"));
  app.use(require("./routes/userAuth"));
  app.listen(process.env.PORT || 5000);
});
