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


//Cascade delete - removes all related products when a category is deleted
CategorySchema.pre('remove', async function(next) {
    console.log(`Products being removed from category ${this._id}`);
    await this.model('Product').deleteMany({ category: this._id });
    next();
});


module.exports = mongoose.model('Category', CategorySchema);