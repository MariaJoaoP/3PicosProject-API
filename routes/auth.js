const express = require('express');

const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    login,
    logout
} = require('../controllers/auth');


const { protect } = require('../middleware/auth');


const router = express.Router();


router.route('/users')
    .get(protect, getUsers)
    .post(createUser);


router.route('/users/:id')
    .get(protect, getUser)
    .put(protect, updateUser)
    .delete(protect, deleteUser);

    
router
    .post('/login', login);


router
    .get('/logout', protect, logout);


module.exports = router;