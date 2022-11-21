const Category = require('../models/Category');
const ErrorResponse = require('../utils/errorResponse'); 
const asyncHandler = require('../middleware/asyncHandler'); 


// @desc      Get all categories
// @route     GET /api/v1/categories
// @access    Public
exports.getCategories = asyncHandler ( async (req, res, next) => {
    let query;
    const reqQuery = { ...req.query };
    const removeFields = ['select', 'sort', 'order', 'page', 'limit'];
    removeFields.forEach(param => delete reqQuery[param]);
    let queryStr = JSON.stringify(reqQuery); 
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`); 
    query = Category.find(JSON.parse(queryStr));

    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' '); 
      console.log(fields);
      query = query.select(fields);
    }
    // Sort 
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy); 
    } else {
      query = query.sort('name'); 
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1; 
    const limit = parseInt(req.query.limit, 10) || 2; 
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Category.countDocuments();
    query = query.skip(startIndex).limit(limit); 
    const categories = await query;

    // Pagination result
    const pagination = {};
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res
      .status(200)
      .json({
        success: true,
        count: categories.length,
        pagination,
        data: categories
      });   
});


// @desc      Get single category
// @route     GET /api/v1/categories/:id
// @access    Public
exports.getCategory = asyncHandler( async( req, res, next ) => {
    const category = await Category.findById(req.params.id);
    if( !category ){
        return next( new ErrorResponse(`Category not found with id ${req.params.id}`, 404) );
    }
    res.status(200).json( {success: true, data: category} ); 
});


// @desc      Create new category
// @route     POST /api/v1/categories
// @access    Private
exports.createCategory = asyncHandler( async( req, res, next ) => {
    const category = await Category.create(req.body);
    res.status(201).json( {success: true, data: category} );
});


// @desc      Update category
// @route     PUT /api/v1/categories/:id
// @access    Private
exports.updateCategory = asyncHandler( async( req, res, next ) => {
    const category = await Category.findByIdAndUpdate( req.params.id, req.body, {
        new: true,
        runValidators: true
    } );
    if( !category ){
        return next( new ErrorResponse(`Category not found with id ${req.params.id}`, 404) );
    }
    res.status(200).json( {success: true, data: category} );
} );


// @desc      Delete category
// @route     DELETE /api/v1/categories/:id
// @access    Private
exports.deleteCategory = asyncHandler( async( req, res, next ) => {
    const category = await Category.findByIdAndDelete(req.params.id);
        if( !category ){
            return next( new ErrorResponse(`Category not found with id ${req.params.id}`, 404) );
        }
        res.status(200).json( {success: true, data: category} );
} );

