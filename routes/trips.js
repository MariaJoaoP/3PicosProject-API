const express = require('express');

const {
    getTrips,
    getTrip,
    createTrip,
    updateTrip,
    deleteTrip
} = require('../controllers/trips');


const { protect, authorize } = require('../middleware/auth');


const router = express.Router();


router.route('/')
    .get(getTrips)
    .post(protect, authorize('admin'), createTrip);

router.route('/:id')
    .get(getTrip)
    .put(protect, authorize('admin'), updateTrip)
    .delete(protect, authorize('admin'), deleteTrip);


module.exports = router;