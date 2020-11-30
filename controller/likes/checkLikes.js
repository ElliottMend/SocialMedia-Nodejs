const interactionID = require('../interactionId')
const checkLikes = (req,res,next) =>{
    const intID = await interactionID(req.body.user);
  res.json(intID.likes);
}
module.exports = checkLikes;