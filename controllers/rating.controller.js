const ratingModel = require('../models/rating.model');

const getRating = async (req, res) => {
    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }

    const get = await ratingModel.getRating();
    
    if(!get.length) {
        return res.status(404).json({
            error: 'No Rating Found.'
        });
    }

    return res.status(200).json(get);
};

const getAvgRating = async (req, res) => {
    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }

    const id = req.params.id;
    const get = await ratingModel.getAvgRating(id);

    if(get?.error){
        return res.status(400).json(get);
    }

    if(!get.length) {
        return res.status(404).json({
            error: 'No Rating Found.'
        });
    }

    return res.status(200).json(get);
};

const getRatingByBook = async (req, res) => {
    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }

    const id = req.params.id;
    const get = await ratingModel.getRatingByBook(id);

    if(get?.error){
        return res.status(400).json(get);
    }

    if(!get.length) {
        return res.status(404).json({
            error: 'No Rating Found.'
        });
    }

    return res.status(200).json(get);
};

const addRating = async (req, res) => {
    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }

    const rating = req.body;
    return res.status(200).json(await ratingModel.addRating(rating));
};

const deleteRatingByID = async (req, res) => {
    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }

    const id = req.params.id;
    const get = await ratingModel.deleteRatingByID(id);

    if(get?.error){
        return res.status(400).json(get);
    }

    return res.status(200).json(get);
};

module.exports = {
    getRating,
    getAvgRating,
    getRatingByBook,
    addRating,
    deleteRatingByID,
};