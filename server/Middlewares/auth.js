const User = require("../Models/user");

let auth = (req, res, next) => {
  let token = req.body.token;

  User.findByToken(token, (err, user) => {
    if (err || !user) return res.status(200).json({ isAuth: false, err });

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
