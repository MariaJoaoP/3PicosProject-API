const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse'); 
const asyncHandler = require('../middleware/asyncHandler'); 


// @desc      Get all users / subscriptors
// @route     GET /api/v1/auth/users
// @access    Private

exports.getUsers = asyncHandler ( async (req, res, next) => {
  let query;
    const reqQuery = { ...req.query };
    const removeFields = ['select', 'sort', 'order', 'page', 'limit'];
    removeFields.forEach(param => delete reqQuery[param]);
    let queryStr = JSON.stringify(reqQuery); 
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`); 
    query = User.find(JSON.parse(queryStr));

    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' '); 
      console.log(fields);
      query = query.select(fields);
    }
    // Sort 
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy); 
    } else {
      query = query.sort('name'); 
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1; 
    const limit = parseInt(req.query.limit, 10) || 2; 
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await User.countDocuments();
    query = query.skip(startIndex).limit(limit); 
    const users = await query;

    // Pagination result
    const pagination = {};
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res
      .status(200)
      .json({
        success: true,
        count: users.length,
        pagination,
        data: users
      }); 
});


// @desc      Get user
// @route     GET /api/v1/auth/users/:id
// @access    Private

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if( !user ){
    return next( new ErrorResponse(`User not found with id ${req.params.id}`, 404) );
  }
  res.status(200).json({
    success: true,
    data: user
  });
});


// @desc      Create new user
// @route     POST /api/v1/auth/users
// @access    Private

exports.createUser = asyncHandler( async( req, res, next ) => {
  const user = await User.create(req.body);
  // res.status(201).json( {success: true, data: user} );
  
  // Create token
  sendTokenResponse( user, 200, res );
});


// @desc      Update user
// @route     PUT /api/v1/auth/users/:id
// @access    Private
exports.updateUser = asyncHandler( async( req, res, next ) => {
  const user = await User.findByIdAndUpdate( req.params.id, req.body, {
      new: true,
      runValidators: true
  } );
  if( !user ){
      return next( new ErrorResponse(`User not found with id ${req.params.id}`, 404) );
  }
  res.status(200).json( {success: true, data: user} );
} );


// @desc      Delete user
// @route     DELETE /api/v1/auth/users/:id
// @access    Private

exports.deleteUser = asyncHandler( async( req, res, next ) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if( !user ){
      return next( new ErrorResponse(`User not found with id ${req.params.id}`, 404) );
  }
  res.status(200).json( {success: true, data: user} );
} );


// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {

  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token
    });
};


// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public

exports.login = asyncHandler( async ( req, res, next ) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
      return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
      return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
      return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Create token
  sendTokenResponse( user, 200, res );
}); 


// @desc      Logout user 
// @route     GET /api/v1/auth/logout
// @access    Private

exports.logout = asyncHandler(async (req, res, next) => {
res.cookie('token', 'none', { 
  expires: new Date(Date.now() + 10 * 1000),
  httpOnly: true
});

res.status(200).json({
  success: true,
  data: {}
});
});