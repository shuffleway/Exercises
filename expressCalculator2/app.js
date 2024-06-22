const express = require('express');
const app = express();
const ExpressError = require('./expressError');
const { convertAndValidateNumsArray, findMode, findMean, findMedian } = require('./helpers');

app.get('/mean', (req, res, next)=>{
    if (!req.query.nums) {
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
    }
    let numsAsStrings = req.query.nums.split(',');

      // check if anything bad was put in
    let nums = convertAndValidateNumsArray(numsAsStrings);
    if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }

   let result = {
    operation: "mean",
    result: findMean(nums)
   }

   return res.send(result);
})

app.get('/median', (req, res, next)=>{
    if (!req.query.nums) {
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
    }
    let numsAsStrings = req.query.nums.split(',');

      // check if anything bad was put in
    let nums = convertAndValidateNumsArray(numsAsStrings);
    if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }


    let result = {
        operation: "median",
        result: findMedian(nums)
    }
    
    return res.send(result);
})

app.get('/mode', (req, res, next)=>{
    if (!req.query.nums) {
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
    }
    let numsAsStrings = req.query.nums.split(',');

      // check if anything bad was put in
    let nums = convertAndValidateNumsArray(numsAsStrings);
    if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }

    let result = {
        operation: "mode",
        result: findMode(nums)
    }
    
    return res.send(result);
 })

/** general error handler */

app.use(function (req, res, next) {
    const err = new ExpressError("Not Found",404);
  
    // pass the error to the next piece of middleware
    return next(err);
});
  
/** general error handler */
  
app.use(function (err, req, res, next) {
res.status(err.status || 500);

return res.json({
    error: err,
    message: err.message
});
});




app.listen(3000, function() {
    console.log(`Server starting on port 3000`);
});

// 20240623172116
// http://localhost:3000/mean?nums=1,2,3,456,7,89

// {
//     "operation": "mean",
//     "result": 93
// }