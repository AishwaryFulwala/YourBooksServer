const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    Rating: {
        type: Number,
        default: 0
    },
    Review: {
        type: String,
        default: ''
    },
    ReviewDate: {
        type: Date,
        default: new Date().toISOString(),
    },
    UserID: mongoose.Schema.ObjectId,
    BookID: mongoose.Schema.ObjectId,
});

module.exports = mongoose.model('Rating', ratingSchema);