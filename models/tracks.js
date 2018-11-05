const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trackSchema = new Schema({
    name: String,
    artist: String,
    trackName: String,
    albumn: String,
    id: String
});

module.exports = mongoose.model('track', trackSchema);