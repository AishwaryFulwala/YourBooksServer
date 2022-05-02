const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
    BookName: String,
    Description: {
        type: String,
        default: ''
    },
    BookPic: {
        type: String,
        default: 'https://firebasestorage.googleapis.com/v0/b/yourbooks-f1f3d.appspot.com/o/Images%2FBook%2FNoImage.png?alt=media&token=ab565fc0-d131-42d9-8205-1fb7c44925ca'
    },
    Status: {
        type: Boolean,
        default: true
    },
    NoOfReads: {
        type: Number,
        default: 0
    },
    CategoryID: mongoose.Schema.ObjectId,
    UserID: mongoose.Schema.ObjectId,
});

module.exports = mongoose.model('Books', booksSchema);