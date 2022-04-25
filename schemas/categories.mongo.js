const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
    CategoryName: String,
    CategoryPic: String,
});

module.exports = mongoose.model('Categories', categoriesSchema);