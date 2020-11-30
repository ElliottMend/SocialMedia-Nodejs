const generateAccessToken = require("./generateAccessToken");
const verify = (req, res, next) => {
  const rtoken = req.body.refreshToken;
  const atoken = req.body.accessToken;
  const user = req.body.username;
  if (rtoken) {
    jwt.verify(atoken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        jwt.verify(rtoken, process.env.REFRESH_TOKEN, (err, val) => {
          const accessToken = generateAccessToken({ name: user.name });
          if (err) {
            res.sendStatus(401);
          } else {
            res.json({
              accessToken: accessToken,
              refreshToken: req.body.refreshToken,
            });
          }
        });
      } else {
        res.json({
          accessToken: req.body.accessToken,
          refreshToken: req.body.refreshToken,
        });
      }
    });
  } else {
    res.sendStatus(403);
  }
};
module.exports = verify;
