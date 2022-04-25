const express = require('express')
const categoriesController = require('../controllers/categories.controller')

const categoriesRouter = express.Router()

categoriesRouter.get('/getCategories', categoriesController.getCategories);
categoriesRouter.get('/getCategoryByID/:id', categoriesController.getCategoryByID);

module.exports = categoriesRouter