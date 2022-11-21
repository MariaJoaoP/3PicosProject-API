const express = require('express');

const {
    getMotorcycles,
    getMotorcycle,
    createMotorcycle,
    updateMotorcycle,
    deleteMotorcycle
} = require('../controllers/motorcycles');


const router = express.Router();


router.route('/')
    .get(getMotorcycles)
    .post(createMotorcycle);

router.route('/:id')
    .get(getMotorcycle)
    .put(updateMotorcycle)
    .delete(deleteMotorcycle)


module.exports = router;