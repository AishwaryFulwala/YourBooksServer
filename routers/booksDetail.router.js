const express = require('express')
const booksDetailController = require('../controllers/booksDetail.controller')

const booksDetailRouter = express.Router()

booksDetailRouter.get('/getBooksDetail', booksDetailController.getBooksDetail);
booksDetailRouter.get('/getBooksDetailByID/:id', booksDetailController.getBooksDetailByID);
booksDetailRouter.get('/getPartsByID/:id', booksDetailController.getPartsByID);
booksDetailRouter.post('/addBookDetail', booksDetailController.addBookDetail);

module.exports = booksDetailRouter