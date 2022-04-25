const mongoose = require('mongoose');

const booksDetailSchema = new mongoose.Schema({
    PartNo: {
        type: Number,
        default: 1
    },
    PartName: {
        type: String,
        default: ''
    },
    PartContain: {
        type: String,
        default: ''
    },
    BookID: mongoose.Schema.ObjectId,
});

module.exports = mongoose.model('BooksDetail', booksDetailSchema); 