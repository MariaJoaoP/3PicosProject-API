
// @desc      Get all trips
// @route     GET /api/v1/trips
// @access    Public

exports.getTrips = (req, res, next) => {
    res.status(200).json({ success: true, msg: 'Show all trips' });
};


// @desc      Get single trip
// @route     GET /api/v1/trips/:id
// @access    Public

exports.getTrip = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Show trip ${req.params.id}` });
};


// @desc      Create new trip
// @route     POST /api/v1/trips
// @access    Private

exports.createTrip = (req, res, next) => {
    console.log(req.body); 
    res.status(200).json({ success: true, msg: `Create new trip ${req.body.name}` });
};


// @desc      Update trip
// @route     PUT /api/v1/trips/:id
// @access    Private

exports.updateTrip = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Update trip ${req.params.id}` });
};


// @desc      Delete trip
// @route     DELETE /api/v1/trips/:id
// @access    Private

exports.deleteTrip = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Delete trip ${req.params.id}` });
};

