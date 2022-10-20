const movieBL = require('../models/movieBL')
const express = require('express');
const router = express.Router();
const verifyJWT = require('./verifyToken')

router.get('/', verifyJWT, async function (req,resp) {
    try {
        const movies = await movieBL.getAllMovies();
        resp.status(200).json(movies);
    } catch(error) {
        resp.status(400).json(error)
    }
})

router.get('/:id', verifyJWT, async function (req,resp) {
    const id = req.params.id;
    try {
        const movie = await movieBL.getMovie(id);
        resp.status(200).json(movie)
    } catch(error) {
        resp.status(400).json(error.message)
    }
})

router.post('/',verifyJWT, async function (req,resp) {
    const movie = req.body;
    try {
        const newMovie = await movieBL.addMovie(movie);
        resp.status(200).json(newMovie);
    } catch(error) {
        resp.status(400).json(error.message)
    }
})

router.put('/:id',verifyJWT, async function (req,resp) {
    const id = req.params.id;
    const movie = req.body;
    try {
        await movieBL.updateMovie(id, movie);
        resp.status(200).json("Updated");
    } catch(error) {
        resp.status(400).json(error.message)
    }
})

router.delete('/:id',verifyJWT, async function (req,resp) {
    const id = req.params.id;       
    try {
        await movieBL.deleteMovie(id)
        resp.status(200).json("Deleted Successfully")
    } catch(err) {
        resp.status(400).json(err.message)
    } 
})


module.exports = router