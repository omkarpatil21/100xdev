const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User,Course} =require("../db");
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../config")

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username=req.body.username;
    const password=req.body.password;
    User.create(
        {
            username:username,
            password:password
        }
    )
    .then(function()
    {
        res.send("User created succesfully");
    })
    .catch(function()
    {
        res.status(403).send("Failed to create admin")
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username=req.body.username;
    const password=req.body.password;
    console.log(username)
    console.log(password)
    const user= await User.findOne({username,password});
    console.log(user)
    if(user){
        const token = jwt.sign({username},JWT_SECRET);
        res.json({
            token
        })
    }
    else{
        res.json({
            message:"Invalid Credentials"
        })
    }
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    Course.find()
    .then(function(response){
        res.json({
            courses:response
        })
    })
    .catch(function(){
        res.sendStatus(404)
    })
});

router.post('/courses/:courseId', userMiddleware,async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username =  req.username;
    await User.updateOne({
        username: username
    },{
        "$push":{
            purchasedCourses : courseId
        }
    }) 
    res.json({
        message : "purchase complete"
    }) 
});

router.get('/purchasedCourses', userMiddleware,async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username : req.username
    })
    const courses = await Course.find({
        _id : {
            "$in" : user.purchasedCourses
        }
    })
    res.json({courses})
});

module.exports = router