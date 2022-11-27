const mongoose = require('mongoose');

const MotorcycleSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: [true, 'Please add a brand'],
        trim: true,
        maxlength: [30, 'Brand can not be more than 30 characters']
    },
    model: {
        type: String,
        required: [true, 'Please add a model'],
        trim: true,
        maxlength: [30, 'Model can not be more than 30 characters']
    },
    info: {
        type: String,
        trim: true,
        required: [true, 'Please add the information']
    },
    images: [{ 
        imgName: {
            type: String,
            required: [true, 'Please add a name for the image'],
            unique: true,
            trim: true,
            maxlength: [50, 'Image name can not be more than 50 characters']
        },
        imgDescription: {
            type: String,
            required: [true, 'Please add a description for the image'],
            trim: true,
            maxlength: [200, 'Description can not be more than 200 characters']
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
  
});

module.exports = mongoose.model('Motorcycle', MotorcycleSchema);