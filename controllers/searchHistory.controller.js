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

    if(get?.error){
        return res.status(400).json(get);
    }

    return res.status(200).json(get);
};

const updateSearchHistory = async (req, res) => {
    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }

    const id = req.params.id;
    const { history } = req.body;
    const check = await searchHistoryModel.getSearchHistoryByID(id);

    if(check?.error){
        return res.status(400).json(get);
    }

    if(!check) {
        const get = await searchHistoryModel.insertSearchHistory({ UserID: id, Data: history});
        return res.status(200).json(get);
    }

    const get = await searchHistoryModel.updateSearchHistory(id, history);

    if(get?.error){
        return res.status(400).json(get);
    }

    return res.status(200).json(get);
};

const getSearchData = async (req, res) => {
    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }
    
    const data = req.params.data
    const get = await searchHistoryModel.getSearchData(data);
 
    if(!get?.Book.length && !get?.User.length) {
        return res.status(404).json({
            error: 'No Search Data Found.'
        });        
    }

    return res.status(200).json(get);
};

module.exports = {
    getSearchHistory,
    getSearchHistoryByID,
    updateSearchHistory,
    getSearchData,
};