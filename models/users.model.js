const users = require('../schemas/users.mongo');

const registerUser = async (user) => {
    const newUser = new users(user);
    return await newUser.save();
};

const getUser = async (id) => {
    return await users.findOne({
        Email: id,
    })
};

const updateUser = async (id, user) => {
    return await users.updateOne({
        Email: id
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