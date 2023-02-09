const jwt = require("jsonwebtoken");
require('dotenv').config();

const verifyToken = (req, res, next) =>{
    const token = req.headers.token;
    
    if(token === null){
        
        return res.status(403).json({
            status : "TokenNotAvailable",
            message : "Token is required please provide it!"
        })
    }

    try{
        
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN);

        req.employee = decode;

    }catch(error){
        return res.status(401).json({
            status : "unauthorized",
            message : error.message,
            expiredAt: error.expiredAt
        })
    }
    return next();
}

module.exports = verifyToken;