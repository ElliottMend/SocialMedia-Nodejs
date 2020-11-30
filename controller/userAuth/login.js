const User = require("./models/users"),
  bcrypt = require('bcrypt'),
  generateAccessToken = require('./generateAccessToken'),
  jwt = require('jsonwebtoken')
const login = (req,res,next) =>{
    try {
        const user = await User.findOne({ email: req.body.email }).exec();
        if (!user) {
          return res
            .status(400)
            .send({ message: "The email or password is incorrect" });
        }
        bcrypt.compare(req.body.password, user.password, (err, re) => {
          if (re) {
            const username = req.body.email;
            User.findOne(
              { email: new RegExp("^" + username + "$", "i") },
              (err, doc) => {
                let user = doc.username;
                let bio = doc.bio;
                const usr = { username: user };
                const accessToken = generateAccessToken(usr);
                const refreshToken = jwt.sign(usr, process.env.REFRESH_TOKEN, {
                  expiresIn: "7d",
                });
                res.json({
                  accessToken: accessToken,
                  refreshToken: refreshToken,
                  username: user,
                  bio: bio,
                });
              }
            );
          } else {
            return res
              .status(400)
              .send({ message: "The email or password is incorrect" });
          }
        });
      } catch (err) {
        res.status(500).send(err);
      }
}
module.exports = login