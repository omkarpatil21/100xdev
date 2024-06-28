// Middleware for handling auth
const {Admin}= require("../db/index")
const jwt = require("jsonwebtoken")
const {JWT_SECRET}= require("../config") 

function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token= req.headers.authorisation;
    const jwtToken = token.split(" ")[1];
    console.log(jwtToken)
    decodedValue = jwt.verify(jwtToken,JWT_SECRET);
    console.log(decodedValue)
    if(decodedValue.username){
        req.username=decodedValue.username
        next()
    }
    else{
        res.json({
            message:"Admin does not exist"
        })
    }
}

module.exports = adminMiddleware;