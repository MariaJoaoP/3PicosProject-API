const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [100, 'Name can not be more than 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    // unique: [true, 'Email must be unique'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  address: {
    type: String,
    required: [true, 'Please add the Address'],
    trim: true
  },
  zipCode: {
      type: String,
      required: [true, 'Please add the Zip Code'],
      trim: true
  },
  city: {
      type: String,
      required: [true, 'Please add the City'],
      trim: true
  },
  country: {
      type: String,
      required: [true, 'Please add the Country'],
      trim: true
  },
  phoneNumber: {
      type: String,
      maxlength: [20, 'Phone number can not be longer than 20 characters'],
      unique: true,
      // unique: [true, 'Phone number must be unique'],
      trim: true
  },
  profilePhoto: {
    type: String,
    maxlength: [30, 'ProfilePhoto name can not have more than 30 characters']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  aniversaryDate: {
      type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}); 


// Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);