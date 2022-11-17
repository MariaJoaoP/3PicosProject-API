const Trip = require('../models/Trip');

// @desc      Get all trips
// @route     GET /api/v1/trips
// @access    Public

exports.getTrips = async (req, res, next) => {
    try{
        const trips = await Trip.find();
        res.status(200).json( {success: true, data: trips} );
    } catch( err ){
        res.status(400).json( {success: false, error: err.message} );
    }
};


// @desc      Get single trip
// @route     GET /api/v1/trips/:id
// @access    Public

exports.getTrip = async ( req, res, next ) => {
    try{
        const trip = await Trip.findById(req.params.id);
        if( !trip ){
            return res.status(400).json( {success: false, error: `Trip not found with id ${req.params.id}`} );
        }
        res.status(200).json( {success: true, data: trip} );
    } catch( err ){
        res.status(400).json( {success: false, error: err.message} );
    }
};


// @desc      Create new trip
// @route     POST /api/v1/trips
// @access    Private

exports.createTrip = async (req, res, next) => {
    try {
        const trip = await Trip.create(req.body);
        res.status(201).json( {success: true, data: trip} );
    } catch( err ){
        res.status(400).json( {success: false, error: err.message} );
    }
};


// @desc      Update trip
// @route     PUT /api/v1/trips/:id
// @access    Private

exports.updateTrip = async( req, res, next ) => {
    try{
        const trip = await Trip.findByIdAndUpdate( req.params.id, req.body, {
            new: true,
            runValidators: true
        } );
        if( !trip ){
            return res.status(400).json( {success: false, error: `Trip not found with id ${req.params.id}`} );
        }
        res.status(200).json( {success: true, data: trip} );
    } catch( err ){
        res.status(400).json( {success: false, data: err.message} ); 
    }
};


// @desc      Delete trip
// @route     DELETE /api/v1/trips/:id
// @access    Private

exports.deleteTrip = async (req, res, next) => {
    try{
        const trip = await Trip.findByIdAndDelete(req.params.id);
        if( !trip ){
            return res.status(400).json( {success: false, error: `Trip not found with id ${req.params.id}`} );
        }
        res.status(200).json( {success: true, data: trip} ); //retorna o elemento removido
    } catch( err ){
        res.status(400).json( {success: false, error: err.message} );
    }
};
