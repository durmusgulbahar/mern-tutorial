
const User = require('../models/UserModel');
//login user
const loginUser = async (req, res) => {
    res.json({message: "login route"})
}


//signup user

const signupUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.signup(email, password);
        res.status(200).json({message: "User created", user});
    }
    catch(error) {
        res.status(400).json({message: error.message});
    }
}

module.exports = { 
    loginUser,
    signupUser
}