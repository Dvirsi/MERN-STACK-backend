const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Please enter your full name'],
        unique: false,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: false,
    },
    date: Date,
},{versionKey: false})


module.exports = mongoose.model('user', userSchema)