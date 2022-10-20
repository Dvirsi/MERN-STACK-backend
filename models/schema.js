const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    premieredYear: {
        type: Number,
        required: true
    },
    genres: {
        type: [String],
        required: true
    },
    image: {
        type: String,
        required: true
    },  
})

const memberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    }
})

const subscriptionSchema = new mongoose.Schema({
    movieId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "movie",
    },
    memberId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "member",
    },
    date: Date,
})

const Movie = mongoose.model('movie', movieSchema)
const Member = mongoose.model('member', memberSchema)
const Sub = mongoose.model('subscription', subscriptionSchema)

module.exports = { Movie, Member, Sub }