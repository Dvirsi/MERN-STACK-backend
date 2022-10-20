const { Movie } = require('./schema')
const { deleteAllSubsByMovieId } = require('./subsciptionBL')

const getAllMovies = () => {
    try {
        return Movie.find({});
    } catch(error) {
        throw Error(error)
    }
}

const addMovie = async(obj) => {
    const exists = await Movie.findOne({ name: obj.name });
    if (exists) {
        throw Error('Movie already exists');
    }
    const yearToInt = +obj.premieredYear.slice(0, 4)    
    const movie = new Movie({
        name: obj.name,
        premieredYear: yearToInt,
        genres: obj.genres,
        image: obj.image
    })
    try {
        const newMovie = await movie.save();
        return newMovie
    } catch(error) {
        throw Error(error)
    }
}

const deleteMovie = async(id) => {
    try {
        await deleteAllSubsByMovieId(id)
        await Movie.findByIdAndDelete(id)
    } catch(error) {
        throw Error(error)
    }
}

const updateMovie = async(id, obj) => {
    await Movie.findByIdAndUpdate(id, {
        name: obj.name,
        premieredYear: obj.premieredYear,
        genres: obj.genres,
        image: obj.image
    })
}

module.exports = { getAllMovies, addMovie, deleteMovie, updateMovie }