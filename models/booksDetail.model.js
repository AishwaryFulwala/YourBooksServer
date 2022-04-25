const  mongoose = require('mongoose');
const booksDetail = require('../schemas/booksDetail.mongo');

const getBooksDetail = async () => {
    return await booksDetail.find();
};

const getBooksDetailByID = async (id) => {
    return await booksDetail.aggregate([
        {
            $match: {
                BookID: mongoose.Types.ObjectId(id),
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
            $project: {
                PartNo: '$PartNo',
                PartName: '$PartName',
                PartContain: '$PartContain',
                BookName: '$books.BookName',
            }
        }
    ]);
};


module.exports = {
    getBooksDetail,
    getBooksDetailByID
}; 