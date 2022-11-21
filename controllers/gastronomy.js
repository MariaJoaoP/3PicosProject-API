const Gastronomy = require('../models/Gastronomy');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler'); 

// @desc      Get all gastronomy
// @route     GET /api/v1/gastronomy
// @access    Public

exports.getGastronomies = asyncHandler ( async (req, res, next) => {
    let query;
    const reqQuery = { ...req.query };
    const removeFields = ['select', 'sort', 'page', 'limit'];
    removeFields.forEach(param => delete reqQuery[param]); 
    let queryStr = JSON.stringify(reqQuery); 
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`); 
    query = Gastronomy.find(JSON.parse(queryStr));
    
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
      query = query.sort('-createdAt'); 
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1; 
    const limit = parseInt(req.query.limit, 10) || 2; 
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Gastronomy.countDocuments();
    query = query.skip(startIndex).limit(limit); 
    const gastronomy = await query;

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
        count: gastronomy.length,
        pagination,
        data: gastronomy
      });
});


// @desc      Get single gastronomy
// @route     GET /api/v1/gastronomy/:id
// @access    Public

exports.getGastronomy = asyncHandler( async( req, res, next ) => {
    const gastronomy = await Gastronomy.findById(req.params.id);
    if( !gastronomy ){
        return next( new ErrorResponse(`Gastronomy not found with id ${req.params.id}`, 404) );
    }
    res.status(200).json( {success: true, data: gastronomy} ); 
});


// @desc      Create new gastronomy
// @route     POST /api/v1/gastronomy
// @access    Private

exports.createGastronomy = asyncHandler( async( req, res, next ) => {
    const gastronomy = await Gastronomy.create(req.body);
    res.status(201).json( {success: true, data: gastronomy} );
});


// @desc      Update gastronomy
// @route     PUT /api/v1/gastronomy/:id
// @access    Private

exports.updateGastronomy = asyncHandler( async( req, res, next ) => {
    const gastronomy = await Gastronomy.findByIdAndUpdate( req.params.id, req.body, {
        new: true,
        runValidators: true
    } );
    if( !gastronomy ){
        return next( new ErrorResponse(`Gastronomy not found with id ${req.params.id}`, 404) );
    }
    res.status(200).json( {success: true, data: gastronomy} );
} );


// @desc      Delete gastronomy
// @route     DELETE /api/v1/gastronomy/:id
// @access    Private

exports.deleteGastronomy = asyncHandler( async( req, res, next ) => {
    const gastronomy = await Gastronomy.findByIdAndDelete(req.params.id);
        if( !gastronomy ){
            return next( new ErrorResponse(`Gastronomy not found with id ${req.params.id}`, 404) );
        }
        res.status(200).json( {success: true, data: gastronomy} );
} );
