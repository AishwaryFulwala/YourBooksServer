const booksDetailModel = require('../models/booksDetail.model');

const getBooksDetail = async (req, res) => {
    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }
    
    const get = await booksDetailModel.getBooksDetail();
    
    if(!get.length) {
        return res.status(404).json({
            error: 'No Books Found.'
        });        
    }

    return res.status(200).json(get);
};

const getBooksDetailByID = async (req, res) => {
    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }
    
    const id = req.params.id;
    const get = await booksDetailModel.getBooksDetailByID(id);

    if(!get.length) {
        return res.status(404).json({
            error: 'No Books Found.'
        });        
    }

    if(get?.error){
        return res.status(400).json(get);
    }

    return res.status(200).json(get);
};

const getPartsByID = async (req, res) => {
    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }
    
    const id = req.params.id;
    const get = await booksDetailModel.getPartsByID(id);

    if(!get.length) {
        return res.status(404).json({
            error: 'No Books Found.'
        });        
    }

    if(get?.error){
        return res.status(400).json(get);
    }

    return res.status(200).json(get);
};

const addBookDetail = async (req, res) => {
    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }

    const book = req.body;
    const get = await booksDetailModel.addBookDetail(book);

    if(get?.error){
        return res.status(400).json(get);
    }

    return res.status(200).json(get);
};

module.exports = {
    getBooksDetail,
    getBooksDetailByID,
    getPartsByID,
    addBookDetail,
};