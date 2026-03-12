const userModels = require("../models/user.models");
const jwt = require("jsonwebtoken");

async function ProtectedMiddleware(req, res, next){
    const token = req.cookies.token;
    if( !token ){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    try{

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if( !decoded ){
            return res.status(400).json({
                message: "404 Not Found"
            })
        }
        const user = await userModels.findOne({
            _id: decoded.id});
        req.user = user;
        next();

    }catch(err){
        return res.status(401).json({ message: "Invalid token" })        
    }
}

module.exports = ProtectedMiddleware;
