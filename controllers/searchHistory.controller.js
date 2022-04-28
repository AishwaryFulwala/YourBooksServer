const searchHistoryModel = require('../models/searchHistory.model');

const getSearchHistory = async (req, res) => {
    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }
    
    const get = await searchHistoryModel.getSearchHistory();
    if(!get.length) {
        return res.status(404).json({
            error: 'No Search History Found.'
        });        
    }

    return res.status(200).json(get);
};

const getSearchHistoryByID = async (req, res) => {
    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }

    const id = req.params.id;

    const get = await searchHistoryModel.getSearchHistoryByID(id);
    if(!get) {
        return res.status(404).json({
            error: 'No Search History Found.'
        });        
    }

    return res.status(200).json(get);
};

const deleteSearchHistory = async (req, res) => {
    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }

    const id = req.params.id;
    const { history } = req.body;

    return res.status(200).json(await searchHistoryModel.deleteSearchHistory(id, history));
};

module.exports = {
    getSearchHistory,
    getSearchHistoryByID,
    deleteSearchHistory,
};