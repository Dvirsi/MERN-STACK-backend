const User = require('./usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

const register = async function (obj) {
    const exists = await User.findOne({ username: obj.username });
    if (exists) {
        throw Error('Username already in use');
    }
    if(obj.password.length < 4) {
        throw Error('Password must be at least 4 charcters')
    }
    const hash = await bcrypt.hash(obj.password, 10);
    const user = new User({
        fullname: obj.fullname,
        username: obj.username,
        password: hash
    })
    try {
        const newUser = await user.save();
        return newUser;
        }  catch (error){
        throw Error(error)
    }
}

const LoginUser = async (obj) => {
    const user = await User.findOne({ username: obj.username });
    if(!user) {
        throw Error("User is not exist")
    }
    const validPass = await bcrypt.compare(obj.password, user.password)
    if(!validPass) {
        throw Error("Invalid password");
    }
    const token = jwt.sign(
        {id: user._id}, 
        process.env.TOKEN_SECRET, 
        { expiresIn: 7200 } // expires after 2 hours (7200ms)
    ) 
    return {token, user};
}

const getUser = async (id) => {
    const user = await User.findById(id);
    return user
}

const getUsers = async () => {
    const users = await User.find({});
    return users
}



module.exports = { register, LoginUser, getUser, getUsers }