const Trip = require('../models/Trip');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler'); 

// @desc      Get all trips
// @route     GET /api/v1/trips
// @access    Public

exports.getTrips = asyncHandler ( async (req, res, next) => {
    let query;
    const reqQuery = { ...req.query };
    const removeFields = ['select', 'sort', 'page', 'limit'];
    removeFields.forEach(param => delete reqQuery[param]); 
    let queryStr = JSON.stringify(reqQuery); 
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`); 
    query = Trip.find(JSON.parse(queryStr));
    
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
    const total = await Trip.countDocuments();
    query = query.skip(startIndex).limit(limit); 
    const trips = await query;

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
        count: trips.length,
        pagination,
        data: trips
      });
});


// @desc      Get single trip
// @route     GET /api/v1/trips/:id
// @access    Public

exports.getTrip = asyncHandler( async( req, res, next ) => {
    const trip = await Trip.findById(req.params.id);
    if( !trip ){
        return next( new ErrorResponse(`Trip not found with id ${req.params.id}`, 404) );
    }
    res.status(200).json( {success: true, data: trip} ); 
});


// @desc      Create new trip
// @route     POST /api/v1/trips
// @access    Private

exports.createTrip = asyncHandler( async( req, res, next ) => {
    const trip = await Trip.create(req.body);
    res.status(201).json( {success: true, data: trip} );
});


// @desc      Update trip
// @route     PUT /api/v1/trips/:id
// @access    Private

exports.updateTrip = asyncHandler( async( req, res, next ) => {
    const trip = await Trip.findByIdAndUpdate( req.params.id, req.body, {
        new: true,
        runValidators: true
    } );
    if( !trip ){
        return next( new ErrorResponse(`Trip not found with id ${req.params.id}`, 404) );
    }
    res.status(200).json( {success: true, data: trip} );
} );


// @desc      Delete trip
// @route     DELETE /api/v1/trips/:id
// @access    Private

exports.deleteTrip = asyncHandler( async( req, res, next ) => {
    const trip = await Trip.findByIdAndDelete(req.params.id);
        if( !trip ){
            return next( new ErrorResponse(`Trip not found with id ${req.params.id}`, 404) );
        }
        res.status(200).json( {success: true, data: trip} );
} );
