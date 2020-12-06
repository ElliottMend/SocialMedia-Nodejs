const interactionID = require("../interactionId");
const checkLikes = async (req, res, next) => {
  const intID = await interactionID(res.locals.username);
  res.send(intID.likes);
};
module.exports = checkLikes;
