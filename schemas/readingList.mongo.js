const mongoose = require('mongoose');

const readingListSchema = new mongoose.Schema({
    UserID: mongoose.Schema.ObjectId,
    BookID: mongoose.Schema.ObjectId,
});

module.exports = mongoose.model('ReadingList', readingListSchema);