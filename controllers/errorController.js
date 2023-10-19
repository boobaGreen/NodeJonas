//Global Error Handling Middleware - 4 argument express recognize is a error middleware
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500; // internal server error 500
  err.status = err.status || 'error';
  res.status(err.statusCode).json({ status: err.status, message: err.message });
};
