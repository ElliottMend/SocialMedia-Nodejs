const User = require("../models/users");
const findUser = async (user) => {
  const users = await User.findOne({ username: user });
  return users;
};
module.exports = findUser;
