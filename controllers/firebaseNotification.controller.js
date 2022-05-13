const usersModel = require('../models/users.model');
const readingListModel = require('../models/readingList.model');
const { admin } = require("../services/firebaseAdmin");

const addFirebaseNotification = async (req, res) => {
    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }

    try {
        const notification = req.body;
        const list = await readingListModel.getReadingListByBookID(notification.BookID);
        
        if(list?.length){
            list.map(async (val) => {
                const getToken = await usersModel.getToken(val.UserID);

                if(getToken?.Token?.length) {
                    const message = {
                        notification: {
                            title: notification.NotificationTitle,
                            body: notification.NotificationBody
                        },
                        tokens: getToken?.Token,
                    };

                    await admin.messaging().sendMulticast(message)
                }
            });
            return res.status(200).json({sucess: "Notification sent successfully"});
        }
    } catch(e) {
        console.error("Error in add firebase notifcation",e)
    }
};

module.exports = {
    addFirebaseNotification,
}; 