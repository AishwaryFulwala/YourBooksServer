const express = require('express')
const ratingController = require('../controllers/rating.controller')

const ratingRouter = express.Router()

ratingRouter.get('/getRating', ratingController.getRating);
ratingRouter.get('/getAvgRating/:id', ratingController.getAvgRating);
ratingRouter.get('/getRatingByBook/:id', ratingController.getRatingByBook);
ratingRouter.patch('/addRating',ratingController.addRating)

module.exports = ratingRouter