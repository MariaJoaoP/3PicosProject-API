const jwt = require('jsonwebtoken');
const asyncHandler = require('./asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// Protect routes
exports.protect = asyncHandler( async (req, res, next) => {
  let token;
  console.log("token", req.cookies.token);
  if(req.cookies.token) {
    token = req.cookies.token
  }

  if (!token) {
    return next(new ErrorResponse('Not authorize to access this route', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    console.log("decoded", decoded);
    req.user = await User.findById(decoded.id);

    next();
  } catch (err) { 
    return next(new ErrorResponse('Not authorize to access this route', 401));
  }
});


// Allow access only to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next( new ErrorResponse( `User role ${req.user.role} is not authorized to access this route`, 403)); 
    }
    next();
  };
};