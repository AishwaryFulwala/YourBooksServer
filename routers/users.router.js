const express = require('express')
const usersController = require('../controllers/users.controller')

const usersRouter = express.Router()

usersRouter.post('/signup', usersController.signup);
usersRouter.post('/signin', usersController.signin);
usersRouter.get('/getUser/:id', usersController.getUser);
usersRouter.get('/getFollow/:id/:fid', usersController.getFollow);
usersRouter.patch('/updateUser/:id', usersController.updateUser);

module.exports = usersRouter