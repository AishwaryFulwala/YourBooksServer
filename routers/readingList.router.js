const express = require('express')
const readingListController = require('../controllers/readingList.controller')

const readingListRouter = express.Router()

readingListRouter.get('/getReadingList', readingListController.getReadingList);
readingListRouter.get('/getReadingListByID/:bid/:uid', readingListController.getReadingListByID);
readingListRouter.get('/getReadingListByUserID/:uid', readingListController.getReadingListByUserID);
readingListRouter.post('/addReadingList', readingListController.addReadingList);
readingListRouter.delete('/deleteReadingList/:id', readingListController.deleteReadingList);
readingListRouter.delete('/deleteReadingListByID/:id', readingListController.deleteReadingListByID);

module.exports = readingListRouter