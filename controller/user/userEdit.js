const User = require("../../models/users"),
  jwt = require("jsonwebtoken");
const userEdit = async (req, res, next) => {
  let decoded;
  if (req.body.bio) {
    await User.findOneAndUpdate(
      { username: res.locals.username },
      { bio: req.body.bio }
    );
  }
  if (req.body.image) {
    await User.findOneAndUpdate(
      { username: res.locals.username },
      { photo: req.body.image }
    );
  }
  if (req.body.location) {
    await User.findOneAndUpdate(
      { username: res.locals.username },
      { location: req.body.location }
    );
  }
  if (req.body.latlng) {
    await User.findOneAndUpdate(
      { username: res.locals.username },
      { latlng: req.body.latlng }
    );
  }
  res.status(200).send();
};
module.exports = userEdit;
