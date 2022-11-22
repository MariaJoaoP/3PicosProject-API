const express = require('express');
const dotenv = require('dotenv');
    dotenv.config({ path: './config/config.env' });
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/database');
    connectDB();
const errorHandler = require('./middleware/errorHandler');


//Route files
const trips = require('./routes/trips'); 
const gastronomy = require('./routes/gastronomy'); 
const motorcycles = require('./routes/motorcycles'); 
const categories = require('./routes/categories'); 
const products = require('./routes/products'); 


const app = express();

    if( process.env.NODE_ENV === 'development' ){
        app.use(morgan('dev'));
    }


app.use(express.json());


//Mount routes
app.use('/api/v1/trips', trips); 
app.use('/api/v1/gastronomy', gastronomy); 
app.use('/api/v1/motorcycles', motorcycles); 
app.use('/api/v1/categories', categories); 
app.use('/api/v1/products', products); 


app.use(errorHandler);


const PORT = process.env.PORT || 5000;
app.listen(
    PORT,
    console.log("server runing on port", PORT)
);