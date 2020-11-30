const interactionID = async (user) => {
  const userId = await findUser(user);
  const intId = await Interaction.find({ user: userId[0]._id });
  return intId[0];
};
module.exports = interactionID;
