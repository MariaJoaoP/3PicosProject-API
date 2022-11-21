const express = require('express');

const {
    getGastronomies,
    getGastronomy,
    createGastronomy,
    updateGastronomy,
    deleteGastronomy
} = require('../controllers/gastronomy');


const router = express.Router();


router.route('/')
    .get(getGastronomies)
    .post(createGastronomy);

router.route('/:id')
    .get(getGastronomy)
    .put(updateGastronomy)
    .delete(deleteGastronomy)


module.exports = router;