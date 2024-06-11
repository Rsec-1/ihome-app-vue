require("dotenv").config(); // Load environment variables
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var connectDB = require("./config/db");
var indexRouter = require("./routes/index");
var userRoutes = require("./routes/users");
var houseRoutes = require("./routes/houses");
var roomRoutes = require("./routes/rooms");
var deviceRoutes = require("./routes/devices");
var sceneRoutes = require("./routes/scenes");

var app = express();

// Connect to database
connectDB();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/users", userRoutes);
app.use("/api/houses", houseRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/devices", deviceRoutes);
app.use("/api/scenes", sceneRoutes);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error", {
    title: 'Error', // Add title variable
    message: err.message,
    error: req.app.get("env") === "development" ? err : {}
  });
});

module.exports = app;
