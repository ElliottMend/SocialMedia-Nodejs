const interactionID = require("../interactionId");
const checkLikes = async (req, res, next) => {
  const intID = await interactionID(req.body.user);
  res.json(intID.likes);
};
module.exports = checkLikes;
