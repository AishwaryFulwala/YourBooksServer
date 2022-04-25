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

    return res.status(200).json(get);
};

module.exports = {
    getBooksDetail,
    getBooksDetailByID
};