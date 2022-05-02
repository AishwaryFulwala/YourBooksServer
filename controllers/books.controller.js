const booksModel = require('../models/books.model');

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
    const get = await booksModel.getBooksByCategory(id);

    if(!get.length) {
        return res.status(404).json({
            error: 'No Book Found.'
        });        
    }

    if(get?.error){
        return res.status(400).json(get);
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

    if(get?.error){
        return res.status(400).json(get);
    }

    return res.status(200).json(get);
};

const getBooksByUser = async (req, res) => {
    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }

    const id = req.params.id;
    const get = await booksModel.getBooksByUser(id);

    if(!get.length) {
        return res.status(404).json({
            error: 'No Book Found.'
        });        
    }

    if(get?.error){
        return res.status(400).json(get);
    }

    return res.status(200).json(get);
};

const getBookNameByUser = async (req, res) => {
    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }

    const id = req.params.id;
    const get = await booksModel.getBookNameByUser(id);

    if(!get.length) {
        return res.status(404).json({
            error: 'No Book Found.'
        });        
    }

    if(get?.error){
        return res.status(400).json(get);
    }

    return res.status(200).json(get);
};

const addBook = async (req, res) => {
    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }

    const book = req.body;
    const get = await booksModel.addBook(book);

    if(get?.error){
        return res.status(400).json(get);
    }

    return res.status(200).json(get);
};

module.exports = {
    getBooks,
    getBooksByCategory,
    getBooksByID,
    getBooksByUser,
    getBookNameByUser,
    addBook,
};