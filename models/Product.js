const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add the product name'],
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [500, 'Description can not be more than 500 characters']
    },
    category: { 
        type: mongoose.Schema.ObjectId, 
        ref: 'Category', 
        required: true
    },
    unit: {
        type: String,
        required: [true, 'Please add a unit type'],
        maxlength: [10, 'Unit can not be more than 10 characters'] 
    },
    unitPrice: {
        type: Number,
        required: [true, 'Please add the product price ']
    },
    discount: {
        type: Number,
        min: [0, 'Discount can not be negative'],
        max: [1, 'Discount can not be more than 1']
    },
    size: {
        type: String,
        enum: [ 'S', 'M', 'L', 'XL' ]
    }, 
    dimensions: {
        type: String,
        maxlength: [30, 'Dimensions name can not be more than 30 characters']
    },
    images: {
        type: [String],
        maxlength: [30, 'Image name can not be more than 30 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', ProductSchema);