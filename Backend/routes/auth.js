const express = require("express");
const router = express.Router();
const user = require('../model/user');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const JWT_SECRET = 'JayminMukesh';

// router.post('/', (req,res)  =>{
//     console.log(req.body);
//     // res.send("hello");
//     const User = user(req.body);
//     User.save();

//     res.send(req.body);

// })

// router.post('/', [
//     body('name', "Enter a valid name").isLength({min:3}),
//     body('email', 'Enter a valid email').isEmail(),
//     body('password',"Password must be atleast 5 characters").isLength({min:5}),



// ],

// (req,res)  =>{
//     // console.log(req.body);
//     // res.send("hello");
   
    
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     user.create({
//         name:req.body.name,
//         password:req.body.password,
//         email:req.body.email

//     }) .then(user => res.json(user))
//     .catch(err => {
//         console.log(err);
//         res.json({error:"Please enter a unique value for email", message:err.message})
//     });
// })

router.post('/createuser', [
    body('name', "Enter a valid name").isLength({min:3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password',"Password must be atleast 5 characters").isLength({min:5}),
],

   async (req,res)  =>{
    let  success =false;

    // bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    try{

    // Assuming your user model has a method createUser
    let User = await user.findOne({email:req.body.email});
    if(User){
        return res.status(400).json({success, error:"Sorry a user with email already exists"})

    } 

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
     User = await user.create({
        name:req.body.name,
        // password:req.body.password,
        password:secPass,
        email:req.body.email
    }) 
    // .then(user => res.json(user))
    // .catch(err => {
    //     console.log(err);
    //     res.json({error:"Please enter a unique value for email", message:err.message})
    // });
    
    const data = {
        User:{
            id:User.id
        }
    }

    // const jwtData = jwt.sign(data, JWT_SECRET);
    // console.log(jwtData);

    // res.json(User)
    let  success =true;

    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({success, authtoken});

} catch(error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
}


})

// Authenticate a user using :POST  No login required

router.post('/login', [
    body('email', "Enter a valid email"). isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req,res) => {
   let  success =false;

    // if there are error, return bad request and the errors

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});

    }


    const {email, password} = req.body;
    try{
        let User = await user.findOne({email});

        if(!User){
            success =false;
            return res.status(400).json({error:"Please try to login correct email"});
        }

        const passwordcompare = await bcrypt.compare(password, User.password);

        if(!passwordcompare){
            success =false;
            return res.status(400).json({success, error:"Please try to login correct password"});

            
        }

        const data = {
            User:{
                id:User.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        success =true;
        res.json({success,authtoken});

       
    }
    catch(error){

        console.log(error.message);
        res.status(500).send("Internal Server Error");

    }


})


// 3 

router.post('/getuser', fetchuser, async (req,res) => {
    try{
        userId = req.User.id;
        const User = await user.findById(userId).select("-password");
        res.send(User);

    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }

})


module.exports = router;


