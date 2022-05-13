const express = require('express')
const notificationController = require('../controllers/notification.controller')

const notificationRouter = express.Router()

notificationRouter.get('/getNotification', notificationController.getNotification);
notificationRouter.get('/getNotificationByID/:id', notificationController.getNotificationByID);
notificationRouter.post('/addNotification', notificationController.addNotification);
notificationRouter.patch('/updateNotification/:id', notificationController.updateNotification);
notificationRouter.delete('/deleteNotificationByID/:id', notificationController.deleteNotificationByID);

module.exports = notificationRouter