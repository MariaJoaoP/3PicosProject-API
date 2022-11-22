const express = require('express');

const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    login
} = require('../controllers/auth');


const router = express.Router();


router.route('/users')
    .get(getUsers)
    .post(createUser);


router.route('/users/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

    
router
    .post('/login', login);


module.exports = router;