const express = require("express");
const ExpressError = require("./expressError")
const app = express();

const bookRoutes = require("./routes/books");

app.use(express.json());

app.use("/books", bookRoutes);



/** 404 catch --- passes to next handler. */

app.use(function (req, res, next) {
    const err = new ExpressError("Not found!", 404);
    return next(err);
  });
  
  /** general error handler */
  
  app.use(function (err, req, res, next) {
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
     if (process.env.NODE_ENV != "test") console.error(err.stack);
  
    // set the status and alert the user
    return res.status(status).json({
      error: {
        message: err.message,
        status: status
      }
    });
  });

  module.exports = app;