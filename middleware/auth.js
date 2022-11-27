const jwt = require('jsonwebtoken');
const asyncHandler = require('./asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const Product = require('../models/Product'); 

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
    if (!req.user) {
      return next(new ErrorResponse('Not authorize to access this route', 401));
    }

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


// Allow access only if logged user is the owner of the product review
exports.authLoggedUser = asyncHandler( async (req, res, next) => {
  const loggedUser = req.user.id;
  // console.log("loggedUser:", loggedUser);

  const review = await Product.findById(req.params.id).select({ reviews: {$elemMatch: {_id: req.params.reviewId}}});
  // console.log("review:", review);
    if( !review ){
      return next( new ErrorResponse(`Product not found with id ${req.params.id}`, 404) );
    }
    if( review.reviews.length == 0 ){
        return next( new ErrorResponse(`Product review not found with id ${req.params.reviewId}`, 404) );
    }
  const reviewUser = (review.reviews[0].user);
  // console.log(reviewUser == loggedUser);

  if( loggedUser == reviewUser ){
    next();
  } else {
    return next( new ErrorResponse( `User is not authorized to access this route`, 403)); 
  }
});