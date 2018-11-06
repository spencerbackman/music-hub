const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trackSchema = new Schema({
    name: String,
    artist: String,
    trackName: String,
    albumn: String,
    id: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

module.exports = mongoose.model('track', trackSchema);