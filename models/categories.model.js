const  mongoose = require('mongoose');
const categories = require('../schemas/categories.mongo');

const getCategories = async () => {
    return await categories.find();
};

const getCategoryByID = async (id) => {
    return await categories.findOne({
        _id: mongoose.Types.ObjectId(id),
    });
};

module.exports = {
    getCategories,
    getCategoryByID,
}; 