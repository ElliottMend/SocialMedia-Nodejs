const findUser = async (user) => {
  const users = await User.find({ username: user });
  return users;
};
module.exports = findUser;
