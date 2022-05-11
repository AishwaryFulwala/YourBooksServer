const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    UserName: String,
    Email: String,
    Password: String,
    ContactNo: String,
    ProfilePic: {
        type: String,
        default: 'https://firebasestorage.googleapis.com/v0/b/yourbooks-f1f3d.appspot.com/o/Images%2FProfilePic%2FNoImage.jpeg?alt=media&token=30d728bb-b276-4e5f-9cf7-15eadc93dcdf'
    },
    CoverPic: {
        type: String,
        default: 'https://firebasestorage.googleapis.com/v0/b/yourbooks-f1f3d.appspot.com/o/Images%2FCoverPic%2FNoImage.jpeg?alt=media&token=582e4e99-9bed-4650-afc1-6e7e23a3607b'
    },
    About: String,
    Followings: {
        type: Array,
    },
    Followers: {
        type: Array,
    },
    Token: {
        type: Array,
    },
});

module.exports = mongoose.model('Users', usersSchema);