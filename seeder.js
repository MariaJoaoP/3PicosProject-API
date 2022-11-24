const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');
  dotenv.config({ path: './config/config.env' });
const Trip = require('./models/Trip');  
const Gastronomy = require('./models/Gastronomy'); 
const Motorcycle = require('./models/Motorcycle'); 
const User = require('./models/User'); 
const Category = require('./models/Category'); 
const Product = require('./models/Product'); 

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Read JSON files
const trips = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/trips.json`, 'utf-8')
);
const gastronomy = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/gastronomy.json`, 'utf-8')
);
const motorcycles = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/motorcycles.json`, 'utf-8')
);
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);
const categories = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/categories.json`, 'utf-8')
);
const products = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/products.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await Trip.create(trips);
    await Gastronomy.create(gastronomy);
    await Motorcycle.create(motorcycles);
    await User.create(users);
    await Category.create(categories);
    await Product.create(products);

    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Trip.deleteMany(); 
    await Gastronomy.deleteMany(); 
    await Motorcycle.deleteMany(); 
    await User.deleteMany(); 
    await Category.deleteMany(); 
    await Product.deleteMany(); 

    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};


if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}