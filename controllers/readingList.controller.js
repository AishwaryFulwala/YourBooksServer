const readingListModel = require('../models/readingList.model');

const getReadingList = async (req, res) => {
    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }

    const get = await readingListModel.getReadingList();

    if(!get.length) {
        return res.status(404).json({
            error: 'No List Found.'
        });        
    }

    return res.status(200).json(get);
};

const getReadingListByID = async (req, res) => {
    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }

    const bid = req.params.bid;
    const uid = req.params.uid;
    const get = await readingListModel.getReadingListByID(bid, uid);

    if(!get) {
        return res.status(404).json({
            error: 'No List Found.'
        });        
    }

    if(get?.error){
        return res.status(400).json(get);
    }

    return res.status(200).json(get);
};

const addReadingList = async (req, res) => {
    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }

    const list = req.body;
    return res.status(200).json(await readingListModel.addReadingList(list));
};

const deleteReadingList = async (req, res) => {
    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }

    const id = req.params.id;
    const get = await readingListModel.deleteReadingList(id);

    if(get?.error){
        return res.status(400).json(get);
    }
    
    return res.status(200).json();
};

module.exports = {
    getReadingList,
    getReadingListByID,
    addReadingList,
    deleteReadingList
};