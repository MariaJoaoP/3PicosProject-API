const express = require('express');
const dotenv = require('dotenv');
    dotenv.config({ path: './config/config.env' });
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/database');
    connectDB();


//Route files
const trips = require('./routes/trips'); 


const app = express();

    if( process.env.NODE_ENV === 'development' ){
        app.use(morgan('dev'));
    }


app.use(express.json());


//Mount routes
app.use('/api/v1/trips', trips); 


const PORT = process.env.PORT || 5000;
app.listen(
    PORT,
    console.log("server runing on port", PORT)
);