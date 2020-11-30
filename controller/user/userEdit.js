const User = require("../../models/users");
const userEdit = async (req, res, next) => {
  if (req.body.bio) {
    await User.findOneAndUpdate(
      { username: req.body.user },
      { bio: req.body.bio }
    );
  }
  if (req.body.image) {
    await User.findOneAndUpdate(
      { username: req.body.user },
      { photo: req.body.image }
    );
  }
  if (req.body.location) {
    await User.findOneAndUpdate(
      { username: req.body.user },
      { location: req.body.location }
    );
  }
  if (req.body.latlng) {
    await User.findOneAndUpdate(
      { username: req.body.user },
      { latlng: req.body.latlng }
    );
  }
};
module.exports = userEdit;
