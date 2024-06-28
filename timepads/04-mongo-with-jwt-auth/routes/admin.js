const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin,Course} = require("../db/index")
const {JWT_SECRET} = require("../config")
const jwt = require("jsonwebtoken")

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username= req.body.username;
    const password=req.body.password;
    Admin.create({
        username,
        password
    })
    .then(function(){
        res.json({
            messge : "Admin created successfully"
        })
    })
    .catch(function(){
        res.status(403).json({
            message : "Failed to create admin"
        })
    })
});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    const username=req.body.username
    const password=req.body.password
    const admin= await Admin.findOne({username,password});
    if(admin){
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

router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description =  req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;
    Course.create(
        {
            title: title,
            description : description,
            price : price,
            imageLink : imageLink
        }
    )
    .then(function(course)
    {
        res.json({
            message: 'Course created successfully', 
            courseId: course._id
        })
    })
    .catch(function(){
        res.status(403).send("Failed to create course")
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const courses = await Course.find();
    if(courses){
        res.json({
            courses
        })
    }
    else{
        res.sendStatus(404)
    }
});

module.exports = router;