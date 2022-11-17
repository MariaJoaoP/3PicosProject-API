const Trip = require('../models/Trip');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler'); 

// @desc      Get all trips
// @route     GET /api/v1/trips
// @access    Public

exports.getTrips = asyncHandler ( async (req, res, next) => {
    const trips = await Trip.find();
    res.status(200).json( {success: true, data: trips} );
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
