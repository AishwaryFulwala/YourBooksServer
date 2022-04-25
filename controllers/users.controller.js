const usersModel = require('../models/users.model');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    const user = req.body;

    const check = await usersModel.getUser(user.Email);

    if(check) {
        return res.status(409).json({
            error: 'User is already exists.'
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
    
    const check = await usersModel.getUser(user.Email);
 
    if(!check) {
        return res.status(403).json({
            error: 'User doesn\'t exists.'
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
    return res.status(200).json(get);
};

const updateUser = async (req, res) => {
    if(!req.user) {
        return res.status(401).json({
            error: 'You must have to Login.',
        });
    }
    
    let user = req.body;
    const id = req.params.id;
    user = {...user.user}
    
    const check = await usersModel.getUser(id);

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
    
    const get = await usersModel.updateUser(id, user)
    return res.status(200).json(get);
};

module.exports = {
    signup,
    signin,
    getUser,
    updateUser,
};