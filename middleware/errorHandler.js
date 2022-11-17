const ErrorResponse = require('../utils/errorResponse');

const errorHandler = ( err, req, res, next ) => {

    let error = { ...err };
    error = new ErrorResponse( err.message, err.statusCode );

    if (err.name === 'CastError') {
        const message = `Data not found - Cast Error - invalid id of ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    if (err.code === 11000) {   // Mongoose duplicate key
        const message = 'Duplicate field value entered';
        error = new ErrorResponse(message, 400);
    }
    
    if (err.name === 'ValidationError') {   // Mongoose validation error
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json( {success: false, error: error.message || "Server Error"} );
};

module.exports = errorHandler;