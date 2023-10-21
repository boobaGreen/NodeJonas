const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
// NOTE 1) MIDLLEWAREs
console.log('process.env.NODE_ENV = ', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json()); // Middleware add the data from the body to the request object

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.headers);
  next();
});

// NOTE 2) ROUTES

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// set route for all no match routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find${req.originalUrl} on this server`, 404));

  // New versione without function custom error
  // const err = new Error(`Can't find${req.originalUrl} on this server`);
  // err.status = 'fail';
  // err.statusCode = 404;
  // if next receive an argument he assume there is an error and skip all the others middleware and pass the error to the global error middleware

  // OLD VERSION
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find${req.originalUrl} on this server`,
  // });
});

//Global Error Handling Middleware - 4 argument express recognize is a error middleware
app.use(globalErrorHandler);

module.exports = app;
