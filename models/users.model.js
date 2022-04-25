const  mongoose = require('mongoose');
const users = require('../schemas/users.mongo');

const registerUser = async (user) => {
    const newUser = new users(user);
    return await newUser.save();
};

const getUser = async (id) => {
    return await users.findOne({
        _id: mongoose.Types.ObjectId(id),
    })
};

const updateUser = async (id, user) => {
    return await users.updateOne({
        _id: mongoose.Types.ObjectId(id)
    }, {
        $set: {
            ...user,
        }
    });
};

module.exports = {
    registerUser,
    getUser,
    updateUser,
}; 