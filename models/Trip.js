const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [150, 'Name can not be more than 150 characters']
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'Please add a description']
    },
    city: {
        type: String,
        trim: true,
        required: [true, 'Please add a city']
    },
    country: {
        type: String,
        trim: true,
        required: [true, 'Please add a country']
    },
    tripDate: {
        type: Date,
        required: [true, 'Please add a date']
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
            maxlength: [500, 'Description can not be more than 500 characters']
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
  
});

module.exports = mongoose.model('Trip', TripSchema);