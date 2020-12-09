const logout = (req, res, next) => {
  res.clearCookie("RefreshToken", {
    httpOnly: true,
    secure: process.env.SECURE === "false" ? false : true,
    sameSite: "none",
  });
  res.clearCookie("AccessToken", {
    httpOnly: true,
    secure: process.env.SECURE === "false" ? false : true,
    sameSite: "none",
  });
  next();
};
module.exports = logout;
