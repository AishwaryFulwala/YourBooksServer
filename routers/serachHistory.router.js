const express = require('express')
const searchHistoryController = require('../controllers/searchHistory.controller')

const searchHistoryRouter = express.Router()

searchHistoryRouter.get('/getSearchHistory', searchHistoryController.getSearchHistory);
searchHistoryRouter.get('/getSearchHistoryByID/:id', searchHistoryController.getSearchHistoryByID);
searchHistoryRouter.patch('/updateSearchHistory/:id', searchHistoryController.updateSearchHistory);
searchHistoryRouter.get('/getSearchData/:data', searchHistoryController.getSearchData);

module.exports = searchHistoryRouter