const express = require('express');

const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getProductReviews,
    getProductReview,
    updateProductReview,
    deleteProductReview
} = require('../controllers/products');


const { protect, authorize, authLoggedUser } = require('../middleware/auth');


const router = express.Router();


router.route('/')
    .get(getProducts)
    .post(protect, authorize('admin'), createProduct);

router.route('/:id')
    .get(getProduct)
    .put(protect, authorize('admin'), updateProduct)
    .delete(protect, authorize('admin'), deleteProduct); 


router.route('/:id/reviews')
    .post(protect, createProductReview)
    .get(getProductReviews);
router.route('/:id/reviews/:reviewId')
    .get(getProductReview)
    // .put(protect, updateProductReview);
    .put(protect, authLoggedUser, updateProductReview)
    // .delete(protect, deleteProductReview);
    .delete(protect, authLoggedUser, deleteProductReview);


module.exports = router;