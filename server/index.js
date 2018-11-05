const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const path = require('path');
const port = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, "client", "build")))

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/tracks', require('../routes/tracks'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/tracks', { useNewUrlParser: true }, (err) => {
    if(err) console.log(err);
    console.log('connected to db');
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
});