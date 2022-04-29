const mongoose = require('mongoose');
const searchHistory = require('../schemas/searchHistory.mongo');
const users = require('../schemas/users.mongo');
const books = require('../schemas/books.mongo');

const getSearchHistory= async () => {
    return await searchHistory.find();
};

const getSearchHistoryByID = async (id) => {
    if(!mongoose.Types.ObjectId.isValid(id))
        return { error: 'Invalid Opration.' };

    return await searchHistory.findOne({
        UserID: mongoose.Types.ObjectId(id),
    });
};

const updateSearchHistory = async (id, data) => {
    if(!mongoose.Types.ObjectId.isValid(id))
        return { error: 'Invalid Opration.' };

    return await searchHistory.updateOne({
        UserID: mongoose.Types.ObjectId(id)
    }, {
        Data: [...data]
    });
};

const insertSearchHistory = async (history) => {
    const newHistory = new searchHistory(history);
    return await newHistory.save();
};

const getSearchData= async (data) => {
    const resBook = await books.find({
        BookName: new RegExp(data, 'i')
    }).sort({ _id : -1 });

    const resUser = await users.find({
        UserName: new RegExp(data, 'i')
    });

    return {
        Book: resBook,
        User: resUser,
    }
};

module.exports = {
    getSearchHistory,
    getSearchHistoryByID,
    updateSearchHistory,
    insertSearchHistory,
    getSearchData,
}; 