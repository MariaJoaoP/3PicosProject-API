const express = require('express');

const {
    getMotorcycles,
    getMotorcycle,
    createMotorcycle,
    updateMotorcycle,
    deleteMotorcycle
} = require('../controllers/motorcycles');


const { protect } = require('../middleware/auth');


const router = express.Router();


router.route('/')
    .get(getMotorcycles)
    .post(protect, createMotorcycle);

router.route('/:id')
    .get(getMotorcycle)
    .put(protect, updateMotorcycle)
    .delete(protect, deleteMotorcycle)


module.exports = router;