const User = require("../../models/users"),
  bcrypt = require("bcrypt"),
  Interaction = require("../../models/interactions");
const register = async (req, res, next) => {
  const password = await bcrypt.hash(req.body.password, 10);
  console.log(req.body);
  const register = new User({
    username: req.body.username.toLowerCase().trim(),
    password: password.trim(),
    email: req.body.email.trim(),
  });
  await register.save((err) => {
    if (err != null) {
      if (err.errors.hasOwnProperty("username")) {
        return res.status(400).send({
          message: `'${err.errors.username.value}' is already taken`,
        });
      } else if (err.errors.hasOwnProperty("email")) {
        return res.status(400).send({
          message: `'${err.errors.email.value}' is already taken`,
        });
      }
    } else {
      res.send(register);
    }
  });
  const inter = new Interaction({ user: register._id });
  await inter.save();
};
module.exports = register;
