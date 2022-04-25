const express = require('express')
const readingListController = require('../controllers/readingList.controller')

const readingListRouter = express.Router()

readingListRouter.get('/getReadingList', readingListController.getReadingList);
readingListRouter.get('/getReadingListByID/:bid/:uid', readingListController.getReadingListByID);
readingListRouter.post('/addReadingList', readingListController.addReadingList);
readingListRouter.delete('/deleteReadingList/:id', readingListController.deleteReadingList);

module.exports = readingListRouter