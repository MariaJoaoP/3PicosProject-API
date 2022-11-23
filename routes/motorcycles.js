const express = require('express');

const {
    getMotorcycles,
    getMotorcycle,
    createMotorcycle,
    updateMotorcycle,
    deleteMotorcycle
} = require('../controllers/motorcycles');


const { protect, authorize } = require('../middleware/auth');


const router = express.Router();


router.route('/')
    .get(getMotorcycles)
    .post(protect, authorize('admin'), createMotorcycle);

router.route('/:id')
    .get(getMotorcycle)
    .put(protect, authorize('admin'), updateMotorcycle)
    .delete(protect, authorize('admin'), deleteMotorcycle);


module.exports = router;