//required packages
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const config = require("./config/config").get(process.env.NODE_ENV);
const cookieParser = require("cookie-parser");
const cors = require("cors");

//IMPLEMENTATIONS
mongoose.Promise = global.Promise;
const app = express();

//MIDDLEWARES
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static("client/build"));

//CONNECTION TO DATABASE
mongoose.connect(
  "mongodb+srv://akarX:Ritikmongo123@blogger.tylcn.mongodb.net/blogger?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) console.log("Error in DB connection : " + err);
    else console.log("MongoDB Connection succeeded");
  }
);

//REQUESTS
require("./requests/userRequests")(app);
require("./requests/blogRequests")(app);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

const port = process.env.PORT || 5000;
const host = "0.0.0.0";
app.listen(port, host, () => {
  console.log("Server Running on port: " + port);
});
