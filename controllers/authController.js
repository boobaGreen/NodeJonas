const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    succes: 'succes',
    token,
    data: { user: newUser },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check of email and password exists
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  // const correct = await user.correctPassword(password, user.password);
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect Email or password', 401));
  }

  // 3) If everything ok , send token to client
  const token = signToken(user._id);
  res.status(200).json({
    status: 'succes',
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and Check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(
      new AppError('You are not logged in! PLease log in to access. ', 401),
    );
  }
  // 2) Verifcation

  // 3) Check if user still exists

  // 4) Check if user changed password after the JWT was issued
  next();
});