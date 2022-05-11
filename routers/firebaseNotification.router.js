const express = require('express')
const firebaseNotificationController = require('../controllers/firebaseNotification.controller')

const firebaseNotificationRouter = express.Router()

firebaseNotificationRouter.post('/addFirebaseNotification', firebaseNotificationController.addFirebaseNotification);

module.exports = firebaseNotificationRouter