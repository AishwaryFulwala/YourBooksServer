const mongoose = require('mongoose');
const readingList = require('../schemas/readingList.mongo');

const getReadingList = async () => {
    return await readingList.find();
};

const getReadingListByID = async (bid, uid) => {
    if(!mongoose.Types.ObjectId.isValid(bid))
        return { error: 'Invalid Opration.' };

    if(!mongoose.Types.ObjectId.isValid(uid))
        return { error: 'Invalid Opration.' };

    return await readingList.findOne({
        BookID: mongoose.Types.ObjectId(bid),
        UserID: mongoose.Types.ObjectId(uid)
    });
};

const getReadingListByUserID = async (uid) => {
    if(!mongoose.Types.ObjectId.isValid(uid))
        return { error: 'Invalid Opration.' };

    return await readingList.aggregate([
        {
            $match: {
                UserID: mongoose.Types.ObjectId(uid)
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
                    BookID: '$BookID',
                    BookName: '$books.BookName',
                    BookPic: '$books.BookPic',
                    NoOfReads: '$books.NoOfReads',
                    UserID: '$UserID',
                    ID: '$_id'
                }
            }
        },
        {
            $sort: {
                '_id.ID': -1,
            }
        }
    ]);
};

const addReadingList = async (list) => {
    const newList = new readingList(list);
    return await newList.save();
};

const deleteReadingList = async (id) => {
    if(!mongoose.Types.ObjectId.isValid(id))
        return { error: 'Invalid Opration.' };

    return await readingList.deleteOne({ _id: mongoose.Types.ObjectId(id) });
}

module.exports = {
    getReadingList,
    getReadingListByID,
    getReadingListByUserID,
    addReadingList,
    deleteReadingList
}; 