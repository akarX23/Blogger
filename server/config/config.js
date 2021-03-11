const config = {
  production: {
    SECRET: process.env.SECRET,
    DATABASE: process.env.MONGODB_URI,
    URL: process.env.URL,
  },
  default: {
    SECRET: "BLOGGER",
    DATABASE:
      "mongodb+srv://akarX:Ritikmongo123@blogger.tylcn.mongodb.net/blogger?retryWrites=true&w=majority",
    URL: "localhost:3000",
  },
};

exports.get = function get(env) {
  return config[env] || config.default;
};
