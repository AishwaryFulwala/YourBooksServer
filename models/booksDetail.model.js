const mongoose = require('mongoose');
const booksDetail = require('../schemas/booksDetail.mongo');

const getBooksDetail = async () => {
    return await booksDetail.find();
};

const getBooksDetailByID = async (id) => {
    if(!mongoose.Types.ObjectId.isValid(id))
        return { error: 'Invalid Opration.' };
        
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

const getPartsByID = async (id) => {
    if(!mongoose.Types.ObjectId.isValid(id))
        return { error: 'Invalid Opration.' };

    return await booksDetail.find({
        BookID: mongoose.Types.ObjectId(id),
    }).sort({ PartNo: 1 });
};

const addBookDetail = async (book) => {
    if(!mongoose.Types.ObjectId.isValid(book.BookID))
        return { error: 'Invalid Opration.' };

    const newBook = new booksDetail(book);
    return await newBook.save();
};

const updateBookDetail = async (id, book) => {
    if(!mongoose.Types.ObjectId.isValid(id))
        return { error: 'Invalid Opration.' };

    return await booksDetail.updateOne({
        _id: mongoose.Types.ObjectId(id)
    }, {
        $set: {
            ...book,
        }
    });
};

const deleteBookDetail = async (id) => {
    if(!mongoose.Types.ObjectId.isValid(id))
        return { error: 'Invalid Opration.' };

    return await booksDetail.deleteOne({ _id: id });
}

const deleteAllBookDetail = async (id) => {
    if(!mongoose.Types.ObjectId.isValid(id))
        return { error: 'Invalid Opration.' };

    return await booksDetail.deleteMany({ BookID: id });
}

module.exports = {
    getBooksDetail,
    getBooksDetailByID,
    getPartsByID,
    addBookDetail,
    updateBookDetail,
    deleteBookDetail,
    deleteAllBookDetail
}; 