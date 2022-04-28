const mongoose = require('mongoose');

const searchHistorySchema = new mongoose.Schema({
    UserID: mongoose.Schema.ObjectId,
    Data: {
        type: Array,
    },
});

module.exports = mongoose.model('SearchHistorys', searchHistorySchema);