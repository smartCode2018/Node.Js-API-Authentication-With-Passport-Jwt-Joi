const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config').get(process.env.MODE_ENV);

mongoose.Promise = global.Promise;

mongoose.connect(config.DATABASE, { useNewUrlParser: true });


const app = express();


//Middleware
app.use(bodyParser.json());
app.use(morgan('dev'));


//Routes
app.use('/users',require('./routes/users'));

//Start the server

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`SERVER IS RUNNING ON PORT ${port}`);
})