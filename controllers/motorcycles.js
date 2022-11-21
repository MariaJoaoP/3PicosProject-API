const Motorcycle = require('../models/Motorcycle');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler'); 

// @desc      Get all motorcycles
// @route     GET /api/v1/motorcycles
// @access    Public

exports.getMotorcycles = asyncHandler ( async (req, res, next) => {
    let query;
    const reqQuery = { ...req.query };
    const removeFields = ['select', 'sort', 'page', 'limit'];
    removeFields.forEach(param => delete reqQuery[param]); 
    let queryStr = JSON.stringify(reqQuery); 
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`); 
    query = Motorcycle.find(JSON.parse(queryStr));
    
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
    const total = await Motorcycle.countDocuments();
    query = query.skip(startIndex).limit(limit); 
    const motorcycles = await query;

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
        count: motorcycles.length,
        pagination,
        data: motorcycles
      });
});


// @desc      Get single motorcycle
// @route     GET /api/v1/motorcycles/:id
// @access    Public

exports.getMotorcycle = asyncHandler( async( req, res, next ) => {
    const motorcycle = await Motorcycle.findById(req.params.id);
    if( !motorcycle ){
        return next( new ErrorResponse(`Motorcycle not found with id ${req.params.id}`, 404) );
    }
    res.status(200).json( {success: true, data: motorcycle} ); 
});


// @desc      Create new motorcycle
// @route     POST /api/v1/motorcycles
// @access    Private

exports.createMotorcycle = asyncHandler( async( req, res, next ) => {
    const motorcycle = await Motorcycle.create(req.body);
    res.status(201).json( {success: true, data: motorcycle} );
});


// @desc      Update motorcycle
// @route     PUT /api/v1/motorcycles/:id
// @access    Private

exports.updateMotorcycle = asyncHandler( async( req, res, next ) => {
    const motorcycle = await Motorcycle.findByIdAndUpdate( req.params.id, req.body, {
        new: true,
        runValidators: true
    } );
    if( !motorcycle ){
        return next( new ErrorResponse(`Motorcycle not found with id ${req.params.id}`, 404) );
    }
    res.status(200).json( {success: true, data: motorcycle} );
} );


// @desc      Delete motorcycle
// @route     DELETE /api/v1/motorcycles/:id
// @access    Private

exports.deleteMotorcycle = asyncHandler( async( req, res, next ) => {
    const motorcycle = await Motorcycle.findByIdAndDelete(req.params.id);
        if( !motorcycle ){
            return next( new ErrorResponse(`Motorcycle not found with id ${req.params.id}`, 404) );
        }
        res.status(200).json( {success: true, data: motorcycle} );
} );
