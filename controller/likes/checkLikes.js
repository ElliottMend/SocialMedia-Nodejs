const interactionID = require("../interactionId");
const checkLikes = async (req, res, next) => {
  const intID = await interactionID(res.locals.username);
  res.status(200).send(intID.likes.toString());
};
module.exports = checkLikes;
