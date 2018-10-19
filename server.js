const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const port = 4000;

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/tracks', require('./routes/tracks'))

mongoose.connect('mongodb://localhost/tracks', { useNewUrlParser: true }, (err) => {
    if(err) console.log(err);
    console.log('connected to db');
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})