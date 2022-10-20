const express = require('express');
const router = express.Router();
const userBL = require('../models/user/userBL')
// const movieBL = require('../models/movieBL')
// const memberBL = require('../models/memberBL')
// const subsciptionBL = require('../models/subsciptionBL')

router.post('/login', async function (req,resp) {
    let obj = req.body;
    try {
        const {token, user} = await userBL.LoginUser(obj);
        resp.cookie('token', token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })
        resp.status(200).json({auth: true, result: user.fullname})
    }  catch (error) {
        resp.status(400).json({auth: false, message: error.message})
    }
})  

router.post('/register', async function (req,resp) {
    let obj = req.body;
    try {
        const user = await userBL.register(obj);
        resp.json(user);
    }  
    catch(error) {
        resp.status(401).json(error.message)
    }
})

// router.get('/login',  async function (req,resp) {
//     const movies = await movieBL.getAllMovies()
//     const members = await memberBL.getAllMembers()
//     const subs = await subsciptionBL.getAllSubs()
//     return resp.json({movies, members, subs})
// })


module.exports = router