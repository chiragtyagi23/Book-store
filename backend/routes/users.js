const express = require("express")
const router = express.Router()
const User = require("../models/users")
const jwt = require("jsonwebtoken")
const authenticateToken = require("./userAuth")

//sign up part
router.post("/sign-up",async(req,res)=>{
    try {
        const {username,email,password,address} = req.body
        //check username length
        if(username.length<4){
            return res.status(400).json({message:"username length should be greater 4"})
        }
        //check if user is already exists or not
        const existingUsername = await User.findOne({username:username})
        if(existingUsername){
            return res.status(400).json({message:"username already exists"})
        }

        //check if email exists or not
        const existingEmail = await User.findOne({email:email})
        if(existingEmail){
            return res.status(400).json({message:"email already exists"})
        }

        //pass length should be greater then 6
        if(password.length<6){
            return res.status(400).json({message:"pass length should be greater then 6"})
        }

        const newUser = new User({
            username:username,
            email:email,
            password:password,
            address:address
        })
        await newUser.save() //new user ko database ma kr diya save 
        return res.status(200).json({message:"sign-up success"})

    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
})

// login in part
router.post("/login",async(req,res)=>{
    try {
        const {username,password} = req.body
        const existingUser = await User.findOne({username})
        if(!existingUser){
            return res.status(400).json({message:"user no exists"})
        }

        // Compare passwords directly password is previous pass and existingUser.password is current pass used for login
        if (password === existingUser.password) {
            const authClaims = [
                {name:existingUser.username},
                {role:existingUser.role}
            ]
            const token = jwt.sign({authClaims},"bookstore123",{expiresIn:"30d"})
            return res.status(200).json({ id:existingUser._id,role:existingUser.role,token:token });
        } else {
            return res.status(400).json({ message: "Invalid password" });
        }


    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
})

// get user information 
router.get("/get-user-information",authenticateToken,async(req,res)=>{
    try {
        
         const {id} = req.headers
         const data = await User.findById(id)
         return res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
})

// update address
router.put("/update-address",authenticateToken,async(req,res)=>{
    try {
        const {id} = req.headers
        const {address} = req.body
        await User.findByIdAndUpdate(id,{address:address})
        return res.status(200).json({message:"address updated"})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
})

module.exports = router