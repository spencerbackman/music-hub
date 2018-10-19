const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trackSchema = new Schema({
    artist: {
        type: String,
        required: true
    },
    trackName: String,
    albumn: String,
    id: String
})

module.exports = mongoose.model('track', trackSchema);