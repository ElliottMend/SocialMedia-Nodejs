const User = require("../../models/users"),
  findUsername = require("../findUsername");
const getuserEdit = async (req, res, next) => {
  const user = await findUsername(res.locals.username);
  res.send({ bio: user.bio, latlng: user.latlng, location: user.location });
};
module.exports = getuserEdit;
