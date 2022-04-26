const  mongoose = require('mongoose');
const users = require('../schemas/users.mongo');

const registerUser = async (user) => {
    const newUser = new users(user);
    return await newUser.save();
};

const getUser = async (id) => {
    return await users.findOne({
        _id: mongoose.Types.ObjectId(id)      
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

const getFollow = async (id, user) => {
    return await users.findOne({
        _id: mongoose.Types.ObjectId(id),
        [user?.Followers ?  'Followers' : 'Followings']: [ mongoose.Types.ObjectId(user?.Followers || user?.Followings) ]
    })
};

const updateFollow = async (id, user) => {
    return await users.updateOne({
        _id: mongoose.Types.ObjectId(id)
    }, {
        $push: {
            [user?.Followers ?  'Followers' : 'Followings']: mongoose.Types.ObjectId(user?.Followers || user?.Followings) 
        }
    });
};

const delFollow = async (id, user) => {
    return await users.updateOne({
        _id: mongoose.Types.ObjectId(id)
    }, {
        $pull: {
            [user?.Followers ?  'Followers' : 'Followings']: mongoose.Types.ObjectId(user?.Followers || user?.Followings)
        }
    });
}

module.exports = {
    registerUser,
    getUser,
    updateUser,
    getFollow,
    updateFollow,
    delFollow
}; 