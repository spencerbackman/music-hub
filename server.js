const express = require('express');
const app = express();
require("dotenv").config();
const expressJwt = require("express-jwt");
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require("path");
const port = process.env.PORT || 4000;
const secret = process.env.secret || "I'm a secret";

app.use(express.static(path.join(__dirname, "client", "build")));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(morgan('dev'));

app.use('/tracks', expressJwt({secret: process.env.SECRET}));
app.use('/profile', expressJwt({secret: process.env.SECRET}));

app.use('/tracks', require('./routes/tracks'));
app.use('/auth', require('./routes/auth'));
app.use('/profile', require('./routes/profile'));

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/tracks',{useNewUrlParser: true}, (err) => {
    if(err) console.log(err);
    console.log('connected to db');
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
});
