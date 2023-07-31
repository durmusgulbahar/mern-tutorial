const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

//create token
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET,{expiresIn: '1h'})
}


//login user
const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try{
        const user = await User.login(email, password);

        //create a token
        const token = createToken(user._id);

        res.status(200).json({email, token});
    }
    catch(error) {
        res.status(400).json({message: error.message});
    }
    
}


//signup user

const signupUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.signup(email, password);

        //create a token
        const token = createToken(user._id);


        res.status(200).json({email, token});
    }
    catch(error) {
        res.status(400).json({message: error.message});
    }
}

module.exports = { 
    loginUser,
    signupUser
}