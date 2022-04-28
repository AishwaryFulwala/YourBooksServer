const mongoose = require('mongoose');
const searchHistory = require('../schemas/searchHistory.mongo');

const getSearchHistory= async () => {
    return await searchHistory.find();
};

const getSearchHistoryByID = async (id) => {
    return await searchHistory.findOne({
        UserID: mongoose.Types.ObjectId(id),
    });
};
const deleteSearchHistory = async (id, data) => {
    return await searchHistory.updateOne({
        UserID: mongoose.Types.ObjectId(id)
    }, {
        Data: [...data]
    });
};

module.exports = {
    getSearchHistory,
    getSearchHistoryByID,
    deleteSearchHistory
}; 