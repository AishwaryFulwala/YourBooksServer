const mongoose = require('mongoose');
const users = require('../schemas/users.mongo');

const registerUser = async (user) => {
    const newUser = new users(user);
    return await newUser.save();
};

const checkUser = async (id) => {
    return await users.findOne({
        Email: id
    })
};

const getUser = async (id) => {
    if(!mongoose.Types.ObjectId.isValid(id))
        return { error: 'Invalid Opration.' };

    return await users.findOne({
        _id: mongoose.Types.ObjectId(id)
    })
};

const updateUser = async (id, user) => {
    if(!mongoose.Types.ObjectId.isValid(id))
        return { error: 'Invalid Opration.' };

    return await users.updateOne({
        _id: mongoose.Types.ObjectId(id)
    }, {
        $set: {
            ...user,
        }
    });
};

const checkFollow = async (id, user) => {
    if(!mongoose.Types.ObjectId.isValid(id))
        return { error: 'Invalid Opration.' };

    return await users.findOne({
        _id: mongoose.Types.ObjectId(id),
        [user?.Followers ?  'Followers' : 'Followings']: mongoose.Types.ObjectId(user?.Followers || user?.Followings)
    })
};

const updateFollow = async (id, user) => {
    if(!mongoose.Types.ObjectId.isValid(id))
        return { error: 'Invalid Opration.' };

    return await users.updateOne({
        _id: mongoose.Types.ObjectId(id)
    }, {
        $push: {
            [user?.Followers ?  'Followers' : 'Followings']: mongoose.Types.ObjectId(user?.Followers || user?.Followings) 
        }
    });
};

const delFollow = async (id, user) => {
    if(!mongoose.Types.ObjectId.isValid(id))
        return { error: 'Invalid Opration.' };

    return await users.updateOne({
        _id: mongoose.Types.ObjectId(id)
    }, {
        $pull: {
            [user?.Followers ?  'Followers' : 'Followings']: mongoose.Types.ObjectId(user?.Followers || user?.Followings)
        }
    });
}

const getFollow = async (id) => {
    if(!mongoose.Types.ObjectId.isValid(id))
        return { error: 'Invalid Opration.' };

    const { Followings, Followers } = await users.findOne({
        _id: mongoose.Types.ObjectId(id)
    },{ 
        Followings: 1,
        Followers: 1,
    });

    const resFollowings = await users.find({
        _id: { $in: Followings}
    },{
        _id: 1, 
        UserName: 1, 
        ProfilePic: 1
    });

    const resFollowers = await users.find({
        _id: { $in: Followers}
    },{
        _id: 1, 
        UserName: 1, 
        ProfilePic: 1
    });

    return {
        Followers: resFollowers,
        Followings: resFollowings
    }
};

module.exports = {
    registerUser,
    checkUser,
    getUser,
    updateUser,
    checkFollow,
    updateFollow,
    delFollow,
    getFollow
}; 