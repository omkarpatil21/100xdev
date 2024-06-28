const {User}= require("../db/index")
const jwt = require("jsonwebtoken")
const {JWT_SECRET}=require("../config")

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
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
            message:"User does not exist"
        })
    }
}

module.exports = userMiddleware;