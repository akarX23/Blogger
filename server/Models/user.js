const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config").get(process.env.NODE_ENV);
const salt_i = 10;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  token: {
    type: String,
  },
});

userSchema.pre("save", function (next) {
  let user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(salt_i, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.generateAuthToken = function generateAuthToken(cb) {
  let user = this;
  let token = jwt.sign({ _id: user._id }, config.SECRET);
  user.token = token;

  user.save((err, user) => {
    if (err) return cb(err);
    return cb(null, user);
  });
};

userSchema.methods.comparePasswords = function (candidatePassword, cb) {
  let user = this;
  bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
    return cb(null, isMatch);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  if (!token) return cb(null, null);
  let user = this;
  jwt.verify(token, config.SECRET, function (err, decode) {
    if (err) return cb(err);
    user.findOne({ _id: decode, token: token }, function (err, user) {
      if (err) return cb(err);
      return cb(null, user);
    });
  });
};

userSchema.methods.deleteToken = function (cb) {
  let user = this;
  user.update({ $unset: { token: 1 } }, (err, user) => {
    if (err) return cb(err);
    return cb(null, user);
  });
};

module.exports = mongoose.model("User", userSchema);
