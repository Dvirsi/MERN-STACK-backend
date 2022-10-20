const memberBL = require('../models/memberBL')
const express = require('express');
const router = express.Router();
const verifyJWT = require('./verifyToken')

router.get('/', verifyJWT, async function (req,resp) {
    try {
        const members = await memberBL.getAllMembers();
        return resp.status(200).json(members)
    } catch(error) {
        return resp.status(400).json(error.message)
    }
})

router.post('/',verifyJWT, async function (req,resp) {
    const member = req.body;
    try {
        const newMember = await memberBL.addMember(member);
        return resp.status(200).json(newMember)
    } catch(error) {
        return resp.status(400).json(error.message)
    }
})

router.put('/:id',verifyJWT, async function (req,resp) {
    const id = req.params.id;
    const member = req.body;
    try {
        const updatedMember = await memberBL.updateMember(id, member);
        return resp.status(200).json(updatedMember)
    } catch(error) {
        return resp.status(400).json(error.message)
    }
})

router.delete('/:id',verifyJWT, async function (req,resp) {
    const id = req.params.id;
    try {
        await memberBL.deleteMember(id)
        return resp.status(200).json("Deleted!")
    } catch(error) {
        return resp.status(400).json(error.message)
    }
})

module.exports = router