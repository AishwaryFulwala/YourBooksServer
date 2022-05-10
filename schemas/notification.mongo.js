const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    NotificationTitle: {
        type: String,
        default: ''
    },
    NotificationBody: {
        type: String,
        default: ''
    },
    NotificationDate: {
        type: Date,
        default: new Date().toISOString(),
    },
    BookID: mongoose.Schema.ObjectId,
    UserID: mongoose.Schema.ObjectId,
});

module.exports = mongoose.model('Notification', notificationSchema);