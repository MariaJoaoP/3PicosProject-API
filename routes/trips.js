const express = require('express');

const {
    getTrips,
    getTrip,
    createTrip,
    updateTrip,
    deleteTrip
} = require('../controllers/trips');


const { protect } = require('../middleware/auth');


const router = express.Router();


router.route('/')
    .get(getTrips)
    .post(protect, createTrip);

router.route('/:id')
    .get(getTrip)
    .put(protect, updateTrip)
    .delete(protect, deleteTrip)


module.exports = router;