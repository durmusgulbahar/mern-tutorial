const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });


// static signup method
userSchema.statics.signup = async function (email, password) {
    //validation
    if (!email || !password) {
        throw new Error('Email and password are required');
    }
    if (!validator.isEmail(email)) {
        throw new Error('Email is invalid');
    }
    if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
    }

    const exist = await this.findOne({ email });
    if (exist) {

        throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.create(({ email, password: hashedPassword }));
    return user;
}



module.exports = mongoose.model('User', userSchema);