const express = require('express');

const {
    getGastronomies,
    getGastronomy,
    createGastronomy,
    updateGastronomy,
    deleteGastronomy
} = require('../controllers/gastronomy');


const { protect, authorize } = require('../middleware/auth');


const router = express.Router();


router.route('/')
    .get(getGastronomies)
    .post(protect, authorize('admin'), createGastronomy);

router.route('/:id')
    .get(getGastronomy)
    .put(protect, authorize('admin'), updateGastronomy)
    .delete(protect, authorize('admin'), deleteGastronomy);


module.exports = router;