const booksModel = require('../models/books.model');
const categoriesModel = require('../models/categories.model');
const booksDetailModel = require('../models/booksDetail.model');

const getBooks = async (req, res) => {
    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }

    const get = await booksModel.getBooks();
    if(!get.length) {
        return res.status(404).json({
            error: 'No Book Found.'
        });        
    }

    return res.status(200).json(get);
};

const getBooksByCategory = async (req, res) => {
    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }

    const id = req.params.id;

    const check = await categoriesModel.getCategoryByID(id);
    if(!check) {
        return res.status(403).json({
            error: 'Category doesn\'t exists.'
        });        
    }

    const get = await booksModel.getBooksByCategory(id);
    
    if(!get.length) {
        return res.status(404).json({
            error: 'No Book Found.'
        });        
    }

    return res.status(200).json(get);
};

const getBooksByID = async (req, res) => {
    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }
    
    const id = req.params.id;

    const get = await booksModel.getBooksByID(id);
    if(!get) {
        return res.status(404).json({
            error: 'No Book Found.'
        });        
    }

    return res.status(200).json(get);
};

module.exports = {
    getBooks,
    getBooksByCategory,
    getBooksByID
};