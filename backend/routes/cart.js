const express = require("express")
const router = express.Router()
const User = require("../models/users")
const authenticateToken = require("./userAuth")

// add item in cart
router.put("/add-to-cart",authenticateToken,async(req,res)=>{
    try {
        const {bookid,id} = req.headers
        const userData = await User.findById(id)
        const isBookincart = userData.cart.includes(bookid)
        if(isBookincart){
            return res.json({status:"success",message:"book is aleady present in cart"})
        }
        await User.findByIdAndUpdate(id,{$push:{cart:bookid}})
        return res.json({status:"success",message:"book added to cart"})

    } catch (error) {
        return res.status(500).json({message:"Internal server error"})
    }
})

//remove from cart
router.put("/remove-from-cart/:bookid",authenticateToken,async(req,res)=>{
    try {
        const {bookid} = req.params
        const {id }= req.headers

        await User.findByIdAndUpdate(id,{$pull:{cart:bookid}})
        return res.json({status:"success",message:"book reomoved from cart"})

    } catch (error) {
        return res.status(500).json({message:"Internal server error"})
    }
})

// cart of particular user
router.get("/get-user-cart",authenticateToken,async(req,res)=>{
    try {
        const {id }= req.headers
        const userData = await User.findById(id).populate("cart")
        const cart = userData.cart.reverse() 

        return res.json({status:"success", data:cart})

    } catch (error) {
        return res.status(500).json({message:"Internal server error"})
    }
})


module.exports = router