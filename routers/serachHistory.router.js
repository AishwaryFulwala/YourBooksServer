const express = require('express')
const searchHistoryController = require('../controllers/searchHistory.controller')

const searchHistoryRouter = express.Router()

searchHistoryRouter.get('/getSearchHistory', searchHistoryController.getSearchHistory);
searchHistoryRouter.get('/getSearchHistoryByID/:id', searchHistoryController.getSearchHistoryByID);
searchHistoryRouter.patch('/deleteSearchHistory/:id', searchHistoryController.deleteSearchHistory);

module.exports = searchHistoryRouter