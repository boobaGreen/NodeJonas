const express = require('express');
const morgan = require('morgan');
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
// NOTE MIDLLEWAREs
console.log('process.env.NODE_ENV = ', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json()); // Middleware add the data from the body to the request object

app.use((req, res, next) => {
  console.log('Hello from middleware !😉');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// NOTE ROUTES

app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
