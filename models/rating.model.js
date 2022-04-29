const mongoose = require('mongoose');
const rating = require('../schemas/rating.mongo');

const getRating = async () => {
    return await rating.find();
};

const getAvgRating = async (id) => {
    if(!mongoose.Types.ObjectId.isValid(id))
        return { error: 'Invalid Opration.' };

    return await rating.aggregate([
        {
            $match: {
                BookID: mongoose.Types.ObjectId(id),
            }
        },
        {
            $group: {
                _id: {
                    BookID: '$BookID',
                },
                avg: {
                    $avg: '$Rating'
                }
            }
        }
    ]);
};

const getRatingByBook = async (id) => {
    if(!mongoose.Types.ObjectId.isValid(id))
        return { error: 'Invalid Opration.' };
        
    return await rating.aggregate([
        {
            $match: {
                BookID: mongoose.Types.ObjectId(id),
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'UserID',
                foreignField: '_id',
                as: 'users',
            }
        },
        {
            $unwind: {
                path: '$users',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: {
                    BookID: '$BookID',
                    Rating: '$Rating',
                    Review: '$Review',
                    ReviewDate: '$ReviewDate',
                    UserName: '$users.UserName',
                    ProfilePic: '$users.ProfilePic',
                    ID: '$_id'
                }
            }
        },
        {
            $sort: {
                '_id.ReviewDate': -1,
            }
        }
    ]);
};

const addRating = async (data) => {
    const newRating = new rating(data);
    return await newRating.save();
};

module.exports = {
    getRating,
    getAvgRating,
    getRatingByBook,
    addRating,
}; 