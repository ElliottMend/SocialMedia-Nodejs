const jwt = require("jsonwebtoken"),
  findUsername = require("../findUsername");
const getUser = async (req, res, next) => {
  const user = await findUsername(res.locals.username);
  res.send(user[0]);
};
module.exports = getUser;
