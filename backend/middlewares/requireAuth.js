const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const requireAuth = async (req, res, next) => {

    //verify authentication
    // splits to get the token from the header 'Bearer asdasdsa.fasdfdsaf.asfsadfs'
    const {authorization} = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: "Authorization token required" });
    }

    const token = authorization.split(' ')[1];

    try {

        const { _id } = jwt.verify(token, process.env.SECRET);
        req.user = await User.findOne({ _id }).select('_id');
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized" });
    }
}

module.exports = requireAuth;