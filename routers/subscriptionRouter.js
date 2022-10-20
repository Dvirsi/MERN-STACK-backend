const subBL = require('../models/subsciptionBL')
const express = require('express');
const router = express.Router();
const verifyJWT = require('./verifyToken')

router.get('/', verifyJWT, async function (req,resp) {
    try {
        const subs = await subBL.getAllSubs();
        return resp.status(200).json(subs)
    } catch(error) {
        return resp.status(400).json(error.message)
    }
})

router.get('/:id', verifyJWT, async function (req,resp) {
    const id = req.params.id
    try {
        const sub = await subBL.getSubById(id);
        return resp.status(200).json(sub)
    } catch(error) {
        return resp.status(400).json(error.message)
    }
})

router.post('/', verifyJWT, async function (req,resp) {
    const sub = req.body;
    try {
        const newSub = await subBL.addSub(sub);
        return resp.status(200).json(newSub)
    } catch(error) {
        return resp.status(400).json(error.message)
    }
})

module.exports = router