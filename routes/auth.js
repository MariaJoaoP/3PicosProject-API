const express = require('express');

const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    login,
    logout,
    getMe
} = require('../controllers/auth');


const { protect, authorize } = require('../middleware/auth');


const router = express.Router();


router.route('/users')
    .get(protect, authorize('admin'), getUsers)
    .post(createUser);


router.route('/users/:id')
    .get(protect, authorize('admin'), getUser)
    .put(protect, authorize('admin'), updateUser)
    .delete(protect, authorize('admin'), deleteUser);

    
router
    .post('/login', login);


router
    .get('/logout', protect, logout);


router
    .get('/me', protect, getMe);


module.exports = router;