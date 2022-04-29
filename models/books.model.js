const mongoose = require('mongoose');
const books = require('../schemas/books.mongo');

const getBooks = async () => {
    return await books.find();
};

const getBooksByCategory = async (id) => {
    if(!mongoose.Types.ObjectId.isValid(id))
        return { error: 'Invalid Opration.' };

    return await books.aggregate([
        {
            $match: {
                CategoryID: mongoose.Types.ObjectId(id),
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
            $lookup: {
                from: 'booksdetails',
                localField: '_id',
                foreignField: 'BookID',
                as: 'booksdetails',
            }
        },
        {
            $unwind: {
                path: '$booksdetails',
                preserveNullAndEmptyArrays: false
            }
        },
        {
            $group: {
                _id: {
                    BookID: '$booksdetails.BookID',
                    BookName: '$BookName',
                    Description: '$Description',
                    BookPic: '$BookPic',
                    Status: '$Status',
                    NoOfReads: '$NoOfReads',
                    CategoryID: '$CategoryID',
                    UserName: '$users.UserName'
                },
                count: { $sum: 1 }
            }
        },
        {
            $sort: {
                '_id.BookID': -1
            }
        }
    ]);
};

const getBooksByID = async (id) => {
    if(!mongoose.Types.ObjectId.isValid(id))
        return { error: 'Invalid Opration.' };
    
    return await books.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(id),
            }
        },
        {
            $lookup: {
                from: 'categories',
                localField: 'CategoryID',
                foreignField: '_id',
                as: 'categories',
            }
        },
        {
            $unwind: {
                path: '$categories',
                preserveNullAndEmptyArrays: true
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
            $lookup: {
                from: 'booksdetails',
                localField: '_id',
                foreignField: 'BookID',
                as: 'booksdetails',
            }
        },
        {
            $unwind: {
                path: '$booksdetails',
                preserveNullAndEmptyArrays: false
            }
        },
        {
            $group: {
                _id: {
                    BookID: '$booksdetails.BookID',
                    BookName: '$BookName',
                    Description: '$Description',
                    BookPic: '$BookPic',
                    Status: '$Status',
                    NoOfReads: '$NoOfReads',
                    CategoryName: '$categories.CategoryName',
                    UserID: '$users._id',
                    UserName: '$users.UserName',
                },
                count: { $sum: 1 },
            }
        }
    ]);
};

const getBooksByUser = async (id) => {
    if(!mongoose.Types.ObjectId.isValid(id))
        return { error: 'Invalid Opration.' };
        
    return await books.aggregate([
        {
            $match: {
                UserID: mongoose.Types.ObjectId(id),
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
            $lookup: {
                from: 'booksdetails',
                localField: '_id',
                foreignField: 'BookID',
                as: 'booksdetails',
            }
        },
        {
            $unwind: {
                path: '$booksdetails',
                preserveNullAndEmptyArrays: false
            }
        },
        {
            $group: {
                _id: {
                    BookID: '$booksdetails.BookID',
                    BookName: '$BookName',
                    Description: '$Description',
                    BookPic: '$BookPic',
                    Status: '$Status',
                    NoOfReads: '$NoOfReads',
                    CategoryID: '$CategoryID',
                    UserName: '$users.UserName'
                },
                count: { $sum: 1 }
            }
        },
        {
            $sort: {
                '_id.BookID': -1
            }
        }
    ]);
};

module.exports = {
    getBooks,
    getBooksByCategory,
    getBooksByID,
    getBooksByUser,
}; 