const Product = require('../models/Product');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User');

// @desc      Get all products
// @route     GET /api/v1/products
// @access    Public

exports.getProducts = asyncHandler ( async (req, res, next) => {
    let query;
    const reqQuery = { ...req.query };
    const removeFields = ['select', 'sort', 'order', 'page', 'limit'];
    removeFields.forEach(param => delete reqQuery[param]); 
    let queryStr = JSON.stringify(reqQuery); 
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`); 
  
    query = Product.find(JSON.parse(queryStr)).populate({
      path: 'category',
      select: 'name'
    });
    
    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' '); 
      // console.log(fields);
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
    const total = await Product.countDocuments();
    query = query.skip(startIndex).limit(limit); 
    const products = await query;

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
        count: products.length,
        pagination,
        data: products
      });   
});


// @desc      Get single product
// @route     GET /api/v1/products/:id
// @access    Public

exports.getProduct = asyncHandler( async( req, res, next ) => {
    const product = await Product.findById(req.params.id).populate({
      path: 'category',
      select: 'name'
    });

    if( !product ){
        return next( new ErrorResponse(`Product not found with id ${req.params.id}`, 404) );
    }
    res.status(200).json( {success: true, data: product} );  
});


// @desc      Create new product
// @route     POST /api/v1/products
// @access    Private

exports.createProduct = asyncHandler( async( req, res, next ) => {

    // Prevent reviews from being created upon the product creation
    const { name, description, category, unit, unitPrice, discount, size, dimensions, images, createdAt } = req.body;
    const product = await Product.create({
      name,
      description, 
      category, 
      unit, 
      unitPrice, 
      discount, 
      size, 
      dimensions, 
      images,
      createdAt
    });

    res.status(201).json( {success: true, data: product} );
});


// @desc      Update product
// @route     PUT /api/v1/products/:id
// @access    Private

exports.updateProduct = asyncHandler( async( req, res, next ) => {
    const { reviews } = req.body;
    if (reviews) {
      return next(new ErrorResponse('Reviews must not be handled on this route', 400));
    }

    const product = await Product.findByIdAndUpdate( req.params.id, req.body, {
        new: true,
        runValidators: true
    } );
    if( !product ){
        return next( new ErrorResponse(`Product not found with id ${req.params.id}`, 404) );
    }
    res.status(200).json( {success: true, data: product} );
} );


// @desc      Delete product
// @route     DELETE /api/v1/products/:id
// @access    Private

exports.deleteProduct = asyncHandler( async( req, res, next ) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if( !product ){
        return next( new ErrorResponse(`Product not found with id ${req.params.id}`, 404) );
    }
    res.status(200).json( {success: true, data: product} );
} );


// @desc      Create new product review
// @route     POST /api/v1/products/:id/reviews
// @access    Private

exports.createProductReview = asyncHandler( async( req, res, next ) => {

  const { review, rating } = req.body;
    if (!review && !rating) {
      return next(new ErrorResponse('Please provide a review and/or a rating', 400));
    }
    // Prevent inserting an empty review
    if (review) {
      // console.log(review);
      // console.log(review.trim().length);
      const reviewLength = review.trim().length;
      if (reviewLength == 0) {
        return next(new ErrorResponse('Please provide a content for the review', 400));
      }
    }
    // Prevent inserting a review if the given rating is not valid as invalid types were causing to insert new reviews wihtout the field rating
    if (rating) {
      if (rating != 1 && rating != 2 && rating != 3 && rating != 4 && rating != 5) {
        return next(new ErrorResponse('Please provide a valid rating: 1, 2, 3, 4 or 5', 400));
      }
    }
  
  const user = await User.findById(req.user.id);
  // console.log("user", user);
  const userId = user.id;
  const userName = user.name;
  const userCity = user.city;
  const userReview = {
    "user": userId,
    "name": userName,
    "city": userCity,
    "review": review,
    "rating": rating
  };

  const oldReviews = await Product.findById(req.params.id).select("reviews");
    if( !oldReviews ){
      return next( new ErrorResponse(`Product not found with id ${req.params.id}`, 404) );
    }
  const reviews = oldReviews.reviews;
  reviews.push(userReview);
  // reviews.unshift(userReview);
  // console.log(reviews);
  const newReviews = {reviews: reviews};
  
  const product = await Product.findByIdAndUpdate( req.params.id, newReviews, {
      new: true,
      runValidators: true
  } );
  
  res.status(200).json( {success: true, data: product} );
} );


// @desc      Get all reviews of the product 
// @route     GET /api/v1/products/:id/reviews/
// @access    Public

exports.getProductReviews = asyncHandler( async( req, res, next ) => {
  const prodReviews = await Product.findById(req.params.id).select("reviews");
  // console.log("Product reviews:", prodReviews);

  if( !prodReviews ){
      return next( new ErrorResponse(`Product not found with id ${req.params.id}`, 404) );
  }
  if( prodReviews.reviews.length == 0 ){
      return next( new ErrorResponse(`No reviews found for product with id ${req.params.id}`, 404) );
  }
  
  res.status(200).json( {success: true, data: prodReviews} );
} );


// @desc      Get one specific review of the product 
// @route     GET /api/v1/products/:id/reviews/:reviewId
// @access    Public

exports.getProductReview = asyncHandler( async( req, res, next ) => {
  const prodReview = await Product.findById(req.params.id).select({ reviews: {$elemMatch: {_id: req.params.reviewId}}});

  if( !prodReview ){
      return next( new ErrorResponse(`Product not found with id ${req.params.id}`, 404) );
  }
  if( prodReview.reviews.length == 0 ){
      return next( new ErrorResponse(`Product review not found with id ${req.params.reviewId}`, 404) );
  }
  
  res.status(200).json( {success: true, data: prodReview} );
} );


// @desc      Update one specific product review
// @route     PUT /api/v1/products/:id/reviews/:reviewId
// @access    Private

exports.updateProductReview = asyncHandler( async( req, res, next ) => {
  
  const filter = {reviews: {$elemMatch: {_id: req.params.reviewId}}};
  const { review, rating } = req.body;
  if( !review && !rating ){
    return next( new ErrorResponse(`Must insert an updated review and/or an updated rating to update the product review`, 400) );
  }
  if( review ) {
    const reviewLength = review.trim().length;
      if (reviewLength == 0) {
        return next(new ErrorResponse('Please provide a content for the review', 400));
      }
    const updatedReview = {$set: {"reviews.$.review": review}};
    const updRev = await Product.findOneAndUpdate( filter , updatedReview, {
      new: true,
      runValidators: true
    });
  }
  if( rating ) {
    if (rating != 1 && rating != 2 && rating != 3 && rating != 4 && rating != 5) {
      return next(new ErrorResponse('Please provide a valid rating: 1, 2, 3, 4 or 5', 400));
    }
    const updatedRating = {$set: {"reviews.$.rating": rating}};
    const updRat = await Product.findOneAndUpdate( filter , updatedRating, {
      new: true,
      runValidators: true
    });
  }

  const productUpdRev = await Product.findOne( filter );

  res.status(200).json( {success: true, data: productUpdRev} );
} );


// @desc      Delete one specific product review
// @route     DELETE /api/v1/products/:id/reviews/:reviewId
// @access    Private

exports.deleteProductReview = asyncHandler( async( req, res, next ) => {
 
  const filter = {reviews: {$elemMatch: {_id: req.params.reviewId}}};
  const delRev = {$pull: {reviews: {"_id": req.params.reviewId}}};
 
  const productDelRev = await Product.findOneAndUpdate( filter , delRev, {
    new: true
  });
  
  res.status(200).json( {success: true, data: productDelRev} );
} );