const jwt = require('jsonwebtoken');

module.exports = function verifyJWT (req, resp, next) {
    const token = req.cookies.token
    if(!token) {
        resp.status(401).json({auth: false, message: "Access Denied"});
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            resp.status(500).json({auth: false, message: "You failed to authenticate"});
        } else {
            req.userId = decoded.id;
            next();
        }
    })
}
