const { Sub } = require('./schema')

const getAllSubs = () => {
    try {
        return Sub.find({})
        .populate("movieId")
        .populate("memberId")
    } catch(error) {
        throw Error(error)
    }
}

// const getSubsByMovieId = (movieId) => {
//     try {
//         return Sub.find({movieId: movieId})
//         .populate("movieId")
//         .populate("memberId")
//     } catch(error) {
//         throw Error(error)
//     }
// }

const getSubById = (id) => {
    try {
        return Sub.findById(id)
        .populate("movieId")
        .populate("memberId")
    } catch(error) {
        throw Error(error)
    }
}

const addSub = async (obj) => {
    const sub = new Sub({
        date: obj.date,
        movieId: obj.movieId,
        memberId: obj.memberId
    })
    try {
        const newSub = await sub.save();
        return newSub
    } catch(error) {
        throw Error(error)
    }
}

const deleteAllSubsByMovieId = async (movieId) => {
    try {
        await Sub.deleteMany({ movieId : movieId })
        return "All subs deleted";
    } catch (error) {
        throw Error(error.message)
    }
}

const deleteAllSubsByMemberId = async (memberId) => {
    try {
        await Sub.deleteMany({ memberId : memberId })
        return "All subs deleted";
    } catch (error) {
        throw Error(error.message)
    }
}



module.exports = { getAllSubs, addSub, deleteAllSubsByMovieId, getSubById, deleteAllSubsByMemberId }