const findUsername = require("./findUsername"),
  Interaction = require("../models/interactions");
const interactionID = async (user) => {
  const userId = await findUsername(user);
  const intId = await Interaction.find({ user: userId[0]._id });
  return intId[0];
};
module.exports = interactionID;
