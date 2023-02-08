const jwt = require("jsonwebtoken");
require('dotenv').config();

const verifyToken = (req, res, next) =>{
    const token = req.headers.token;

    if(!token){
        return res.status(403).json({
            status : "Failed",
            message : "Token is required please provide it!"
        })
    }

    try{
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN);

        req.user = decode;

    }catch(error){
        return res.status(401).json({
            status : error.name,
            message : error.message,
            expiredAt: error.expiredAt
        })
    }
    return next();
}

module.exports = verifyToken;