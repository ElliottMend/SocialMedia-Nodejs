const User = require("../../models/users"),
  bcrypt = require("bcrypt"),
  generateAccessToken = require("./generateAccessToken");
const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    if (!user) {
      return res.status(400).send({ message: "The email is incorrect" });
    }
    bcrypt.compare(req.body.password, user.password, (err, re) => {
      if (re) {
        const email = req.body.email;
        User.findOne(
          { email: new RegExp("^" + email + "$", "i") },
          async (err, doc) => {
            let user = doc.username;
            const [
              accessToken,
              refreshToken,
              accessCookie,
              refreshCookie,
            ] = await generateAccessToken(user, email);
            res.cookie("AccessToken", accessToken, accessCookie);
            res.cookie("RefreshToken", refreshToken, refreshCookie);
            res.status(200).send();
          }
        );
      } else {
        return res.status(400).send({ message: "The password is incorrect" });
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
};
module.exports = login;
