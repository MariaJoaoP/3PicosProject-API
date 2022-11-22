const express = require('express');

const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/auth');


const router = express.Router();


router.route('/users')
    .get(getUsers)
    .post(createUser);


router.route('/users/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);


module.exports = router;