const express = require("express"),
  mongoose = require("mongoose"),
  app = express();

require("dotenv").config();
app.use(express.urlencoded({ limit: "50mb" }));

mongoose.connect(process.env.SERVER_URL, { useNewUrlParser: true }).then(() => {
  app.use(express.json());
  app.use(routes);
  app.listen(process.env.PORT || 5000);
});
