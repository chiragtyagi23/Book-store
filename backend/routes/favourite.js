const express = require("express")
const router = express.Router()
const User = require("../models/users")
const authenticateToken = require("./userAuth")

// adding book to favourite
router.put("/add-book-to-favourite",authenticateToken,async(req,res)=>{
    try {
        const {bookid,id} = req.headers
        const userData = await User.findById(id)
        const isBookFavourite = userData.favourates.includes(bookid)
        if(isBookFavourite){
            return res.status(200).json({message:"book is already in favourites"})
        }
        await User.findByIdAndUpdate(id,{$push:{favourates:bookid}})
        return res.status(200).json({message:"book added to favourites"})
    } catch (error) {
        return res.status(500).json({message:"Internal server error"})
    }
})

// removing book from favourite
router.put("/remove-book-from-favourite",authenticateToken,async(req,res)=>{
    try {
        const {bookid,id} = req.headers
        const userData = await User.findById(id)
        const isBookFavourite = userData.favourates.includes(bookid)
        if(isBookFavourite){
            await User.findByIdAndUpdate(id,{$pull:{favourates:bookid}})
        }
        
        return res.status(200).json({message:"book removed from favourites"})
    } catch (error) {
        return res.status(500).json({message:"Internal server error"})
    }
})

// get favourite books of a particular user
router.get("/get-favourite-books",authenticateToken,async(req,res)=>{
    try {
        const {id} = req.headers
        const userData = await User.findById(id).populate("favourates")
        const FavouriteBooks = userData.favourates  
        
        return res.json({status:"success",data:FavouriteBooks})

    } catch (error) {
        return res.status(500).json({message:"Internal server error"})
    }
})

module.exports = router