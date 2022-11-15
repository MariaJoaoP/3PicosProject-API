const express = require('express');
const dotenv = require('dotenv');
    dotenv.config({ path: './config/config.env' });
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/database');
    connectDB();


const app = express();

    if( process.env.NODE_ENV === 'development' ){
        app.use(morgan('dev'));
    }


const PORT = process.env.PORT || 5000;
app.listen(
    PORT,
    console.log("server runing on port", PORT)
);