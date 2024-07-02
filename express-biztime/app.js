/** BizTime express application. */
const express = require("express");
const app = express();
const ExpressError = require("./expressError")

app.use(express.json());

const companiesRoutes = require("./routes/companies");
const invoicesRoutes = require("./routes/invoices");

app.use("/companies", companiesRoutes);
app.use("/invoices", invoicesRoutes);

/**404 handler */

app.use((req, res, next) => {
  const err = new ExpressError('Not Found', 404);
  
  //pass err to the next middleware
  return next(err);
} );

/**General error handler */

app.use((err, req, res, next) => {
    res.status(err.status || 500);

    return res.json({
        error: err.message
    });
});


module.exports = app;
