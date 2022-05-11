const mongoose = require('mongoose');
const notification = require('../schemas/notification.mongo');

const getNotification = async () => {
    return await notification.find();
};

const getNotificationByID = async (id) => {
    if(!mongoose.Types.ObjectId.isValid(id))
        return { error: 'Invalid Opration.' };
        
    // return await notification.find({
    //     UserID: mongoose.Types.ObjectId(id),
    // }).sort({NotificationDate: -1});

    return await notification.aggregate([
        {
            $match: {
                UserID: mongoose.Types.ObjectId(id),
            }
        },
        {
            $lookup: {
                from: 'books',
                localField: 'BookID',
                foreignField: '_id',
                as: 'books',
            }
        },
        {
            $unwind: {
                path: '$books',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: {
                    BookID: '$books._id',
                    NotificationTitle: '$NotificationTitle',
                    NotificationBody: '$NotificationBody',
                    NotificationDate: '$NotificationDate',
                    BookPic: '$books.BookPic',
                    ID: '$_id'
                }
            }
        },
        {
            $sort: {
                '_id.NotificationDate': -1,
            }
        }
    ]);
};

const addNotification = async (noti) => {
    if(!mongoose.Types.ObjectId.isValid(noti.UserID))
        return { error: 'Invalid Opration.' };
    
    if(!mongoose.Types.ObjectId.isValid(noti.BookID))
        return { error: 'Invalid Opration.' };

    const newNotification = new notification(noti);
    return await newNotification.save();
};

const deleteNotificationByID = async (id) => {
    if(!mongoose.Types.ObjectId.isValid(id))
        return { error: 'Invalid Opration.' };

    return await notification.deleteMany({ BookID: mongoose.Types.ObjectId(id) });
}

module.exports = {
    getNotification,
    getNotificationByID,
    addNotification,
    deleteNotificationByID,
}; 