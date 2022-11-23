const express = require('express');

const {
    getGastronomies,
    getGastronomy,
    createGastronomy,
    updateGastronomy,
    deleteGastronomy
} = require('../controllers/gastronomy');


const { protect } = require('../middleware/auth');


const router = express.Router();


router.route('/')
    .get(getGastronomies)
    .post(protect, createGastronomy);

router.route('/:id')
    .get(getGastronomy)
    .put(protect, updateGastronomy)
    .delete(protect, deleteGastronomy)


module.exports = router;