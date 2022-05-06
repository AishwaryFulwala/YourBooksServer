const express = require('express')
const booksDetailController = require('../controllers/booksDetail.controller')

const booksDetailRouter = express.Router()

booksDetailRouter.get('/getBooksDetail', booksDetailController.getBooksDetail);
booksDetailRouter.get('/getBooksDetailByID/:id', booksDetailController.getBooksDetailByID);
booksDetailRouter.get('/getPartsByID/:id', booksDetailController.getPartsByID);
booksDetailRouter.post('/addBookDetail', booksDetailController.addBookDetail);
booksDetailRouter.patch('/updateBookDetail/:id', booksDetailController.updateBookDetail);
booksDetailRouter.delete('/deleteBookDetail/:id', booksDetailController.deleteBookDetail);
booksDetailRouter.delete('/deleteAllBookDetail/:id', booksDetailController.deleteAllBookDetail);

module.exports = booksDetailRouter