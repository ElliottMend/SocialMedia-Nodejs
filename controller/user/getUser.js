const jwt = require("jsonwebtoken");
const getUser = async (req, res, next) => {
    console.log(req.cookies.RefreshToken)
  const decoded = await jwt.verify(
    req.cookies.RefreshToken,
    process.env.REFRESH_SECRET
  );
  console.log(decoded);
  const user = await findUsername(decoded.name);
  res.send(user[0]);
};
module.exports = getUser;
