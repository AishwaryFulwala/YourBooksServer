const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
    BookName: String,
    Description: {
        type: String,
        default: ''
    },
    BookPic: {
        type: String,
        default: 'https://firebasestorage.googleapis.com/v0/b/yourbooks-f1f3d.appspot.com/o/Images%2FBook%2FnoImage.jpeg?alt=media&token=3b5e0bc4-48a8-4ae0-9f47-fe2db6792e73'
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