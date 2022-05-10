const categoriesModel = require('../models/categories.model');

const getCategories = async (req, res) => {
    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }
    
    const get = await categoriesModel.getCategories();
    
    if(!get.length) {
        return res.status(404).json({
            error: 'No Category Found.'
        });        
    }

    return res.status(200).json(get);
};

const getCategoryByID = async (req, res) => {
    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }
    
    const id = req.params.id;
    const get = await categoriesModel.getCategoryByID(id);

    if(!get) {
        return res.status(404).json({
            error: 'No Category Found.'
        });        
    }

    if(get?.error){
        return res.status(400).json(get);
    }

    return res.status(200).json(get);
};

module.exports = {
    getCategories,
    getCategoryByID,
};