const express = require('express');
const cors = require('cors');

const cookieParser = require('cookie-parser');
const session = require('express-session');

const userRouter = require('./routers/userRouter');
const subRouter = require('./routers/subscriptionRouter');
const movieRouter = require('./routers/movieRouter');
const memberRouter = require('./routers/memberRouter');

const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}))

app.use(cookieParser())

app.use(
    session({
        key: "userId",
        secret: process.env.TOKEN_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24,
        },
    })
)

app.use(express.json())

require('./configs/database')

app.use('/api/user', userRouter)
app.use('/api/subscription', subRouter)
app.use('/api/movie', movieRouter)
app.use('/api/member', memberRouter)

console.log("Server is running...");

app.listen(8000)