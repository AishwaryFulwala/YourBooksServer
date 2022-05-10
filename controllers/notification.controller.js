const notificationModel = require('../models/notification.model');

const getNotification = async (req, res) => {
    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }

    const get = await notificationModel.getNotification();
    
    if(!get.length) {
        return res.status(404).json({
            error: 'No Notification Found.'
        });        
    }

    return res.status(200).json(get);
};

const getNotificationByID = async (req, res) => {
    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }

    const id = req.params.id;
    const get = await notificationModel.getNotificationByID(id);
    
    if(get?.error){
        return res.status(400).json(get);
    }

    if(!get.length) {
        return res.status(404).json({
            error: 'No Notification Found.'
        });
    }

    return res.status(200).json(get);
};

const addNotification = async (req, res) => {
    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }

    const notification = req.body;
    const get = await notificationModel.addNotification(notification);

    if(get?.error){
        return res.status(400).json(get);
    }

    return res.status(200).json(get);
};

const deleteNotificationByID = async (req, res) => {
    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }

    const id = req.params.id;
    const get = await notificationModel.deleteNotificationByID(id);

    if(get?.error){
        return res.status(400).json(get);
    }
    
    return res.status(200).json();
};

module.exports = {
    getNotification,
    getNotificationByID,
    addNotification,
    deleteNotificationByID,
}; 