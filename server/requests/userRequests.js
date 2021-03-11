const User = require("../Models/user");
const { auth } = require("../Middlewares/auth");

module.exports = function (app) {
  ///POST REQUESTS///

  app.post("/api/user/register", (req, res) => {
    const user = new User(req.body);

    user.generateAuthToken((err, user) => {
      if (err)
        return res.status(200).json({
          isAuth: false,
          err,
        });

      res.cookie("auth", user.token);
      return res.status(200).json({
        isAuth: true,
        user,
      });
    });
  });

  app.post("/api/user/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) return res.status(400).send(err);
      if (!user)
        return res.status(200).json({
          isAuth: false,
          emailNotFound: true,
          errorMessage: "Auth failed, email not found!",
        });

      user.comparePasswords(req.body.password, (err, isMatch) => {
        if (err) return res.status(400).send(err);
        if (!isMatch)
          return res.status(200).json({
            isAuth: false,
            mismatch: true,
            errorMessage: "Password does not match!",
          });
        user.generateAuthToken((err, user) => {
          if (err)
            return res.status(200).json({
              isAuth: false,
              err,
            });

          res.cookie("auth", user.token, { httpOnly: false });
          return res.status(200).json({
            isAuth: true,
            user,
          });
        });
      });
    });
  });

  app.post("/api/auth", auth, (req, res) => {
    const user = req.user;
    return res.status(200).json({
      user,
      isAuth: true,
    });
  });

  ///GET REQUESTS///

  app.get("/api/logout", auth, (req, res) => {
    req.user.deleteToken((err) => {
      if (err)
        res.status(200).json({
          success: false,
          errorMessage: "Could not logout. Please try again.",
        });
      res.cookie("auth", null);
      res.status(200).json({ isAuth: false });
    });
  });
};
