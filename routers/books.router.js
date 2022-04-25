const express = require('express')
const booksController = require('../controllers/books.controller')

const booksRouter = express.Router()

booksRouter.get('/getBooks', booksController.getBooks);
booksRouter.get('/getBooksByCategory/:id', booksController.getBooksByCategory);
booksRouter.get('/getBooksByID/:id', booksController.getBooksByID);
booksRouter.get('/getBooksByUser/:id', booksController.getBooksByUser);

module.exports = booksRouter