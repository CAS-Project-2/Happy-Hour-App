require("dotenv").config();
const path = require('path');

const createError = require("http-errors");
const express = require("express");
const hbs = require('hbs');


const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users.routes");
const cocktailRouter = require("./routes/cocktail.routes");

const app = express();

hbs.registerPartials(path.join(__dirname, "views/partials"))

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


require("./config/db");

// Functional curling style of loading configuration
require("./config/db");
require("./config/global")(app);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/cocktail", cocktailRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
