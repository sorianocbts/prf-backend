const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const moment = require("moment")
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
// Allow cross-origin
app.use(cors());
app.options("*", cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
// Bodyparser Middleware
app.use(express.json());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Start DB

// SET UP Mongoose Promises.
mongoose.Promise = global.Promise;

// DB Config
const db = process.env.MONGO_URI;
// Connect to Mongo

const options = {
  useUnifiedTopology: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useCreateIndex: true,
  // reconnectTries: 30, // Retry up to 30 times
  // reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect.
  bufferMaxEntries: 0
};

const connectWithRetry = () => {
  console.log("MongoDB connection with retry");
  try {
    mongoose.connect(db, options);
  } catch (err) {
    console.log("MongoDB connection unsuccessful, retry after 5 seconds.", err);
    setTimeout(connectWithRetry, 5000);
  }

  // If the connection throws an error
  mongoose.connection.on("error", function (err) {
    console.log("Mongoose default connection error: " + err);
    setTimeout(connectWithRetry, 3000);
  });
  // When the connection is disconnected
  mongoose.connection.on("disconnected", function () {
    console.log("Mongoose default connection disconnected");
    setTimeout(connectWithRetry, 3000);
  });

  // If the Node process ends, close the Mongoose connection
  process.on("SIGINT", function () {
    mongoose.connection.close(function () {
      console.log(
        "Mongoose default connection disconnected through app termination"
      );
      process.exit(0);
    });
  });
  return;
};
connectWithRetry();

// Use Routes
// app.use("/", require("./routes/index.js"));
app.use("/api/courses", require("./routes/courses"));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
  });
}


const port = process.env.PORT || 80;
app.listen(port, () => console.log(`Server started on port ${port}`));
console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))