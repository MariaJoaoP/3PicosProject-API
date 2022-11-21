const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add the category name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
  
});

module.exports = mongoose.model('Category', CategorySchema);