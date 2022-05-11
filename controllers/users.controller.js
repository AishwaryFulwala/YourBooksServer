const usersModel = require('../models/users.model');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    const user = req.body;
    const check = await usersModel.checkUser(user.Email);

    if(check) {
        return res.status(409).json({
            error: 'Invalid User ID.'
        });        
    }

    bcrypt.hash(user.Password, 10, async (err, hash) => {
        if (err) {
            return res.status(400).json({
                error: 'Invalid Data.'
            });
        }
            
        user.Password = hash;
        
        return res.status(200).json(await usersModel.registerUser(user));
    });
};

const signin = async (req, res) => {
    const user = req.body;    
    const check = await usersModel.checkUser(user.Email);
 
    if(!check) {
        return res.status(403).json({
            error: 'Invalid User ID.'
        });        
    }
    
    try {
        const match = await bcrypt.compare(user.Password, check.Password)

        if(!match) {
            return res.status(403).json({
                error: 'Password is incorrect.'
            });
        }
    } catch (error) {
        return res.status(403).json({
            error: 'Error occure while connecting'
        });
    }    

    const token = jwt.sign({
        email: check.Email,
        _id: check._id,
    }, 'secret');

    return res.status(200).json({
        token,
        id: check._id,
        success: 'Sign In Successfully'
    });
};

const getUser = async (req, res) => {
    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }
    
    const get = await usersModel.getUser(req.params.id);
    
    if(get?.error){
        return res.status(400).json(get);
    }

    return res.status(200).json(get);
};

const getFollow = async (req, res) => {
    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }

    const id = req.params.id;
    const get = await usersModel.getFollow(id);
    
    if(get?.error){
        return res.status(400).json(get);
    }

    return res.status(200).json(get);
};

const updateUser = async (req, res) => {
    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }
    
    const id = req.params.id;
    let user = req.body;
    user = {...user.user}

    const check = await usersModel.getUser(id);

    if(check?.error){
        return res.status(400).json(check);
    }

    if(user?.Password) {
        try {
            const match = await bcrypt.compare(user.OldPwd, check.Password)
        
            if(!match) {
                return res.status(403).json({
                    error: 'Old Password is incorrect.'
                });
            }
        } catch (error) {
            return res.status(403).json({
                error: 'Error occure while connecting'
            });
        }

        try {
            const hash = await bcrypt.hash(user.Password, 10);
            user = {Password: hash};
        } catch (error) {
            return res.status(403).json({
                error: 'Error occure while connecting'
            });
        }
    }

    if(user?.Follow) {
        const check = await usersModel.checkFollow(id, {Followings: user.Follow});

        if(check?.error){
            return res.status(400).json(check);
        }

        if(!check) {
            const getFollowing = await usersModel.updateFollow(id, {Followings: user.Follow});

            if(getFollowing?.error){
                return res.status(400).json(getFollowing);
            }

            const getFollowers = await usersModel.updateFollow(user.Follow, {Followers: id});

            if(getFollowers?.error){
                return res.status(400).json(getFollowers);
            }

            return res.status(200).json({ res: 'Update'});
        }
        else {
            const getFollowing = await usersModel.delFollow(id, {Followings: user.Follow});

            if(getFollowing?.error){
                return res.status(400).json(getFollowing);
            }

            const getFollowers = await usersModel.delFollow(user.Follow, {Followers: id});

            if(getFollowers?.error){
                return res.status(400).json(getFollowers);
            }

            return res.status(200).json({ res: 'Delete'});
        }
    }

    if(user?.Token) {
        const check = await usersModel.checkToken(id, user?.Token);

        if(check?.error){
            return res.status(400).json(check);
        }

        if(!check) {
            const get = await usersModel.updateToken(id, user?.Token);
            return res.status(200).json(get);
        }

        if(check) {
            if(user?.del) {
                const get = await usersModel.delToken(id, user?.Token);
                return res.status(200).json(get);
            }
        }
    }
    
    const get = await usersModel.updateUser(id, user);

    if(get?.error){
        return res.status(400).json(get);
    }

    return res.status(200).json(get);
};

module.exports = {
    signup,
    signin,
    getUser,
    getFollow,
    updateUser,
};