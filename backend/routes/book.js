const express = require("express")
const router = express.Router()
const User = require("../models/users")
const jwt = require("jsonwebtoken")
const Book = require("../models/books")
const authenticateToken = require("./userAuth")

// admin role
router.post("/add-book",authenticateToken,async(req,res)=>{
    try {
        const {id} = req.headers
        const user = await User.findById(id)
        if(user.role!=="admin"){
            return res.status(400).json({message:"only for the admin"})
        }
        const book = new Book({
            url:req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            desc:req.body.desc,
            language:req.body.language, 
        })
        await book.save()
        res.status(200).json({message:"book added success"})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
})

//update book
router.put("/update-book",authenticateToken,async(req,res)=>{
    try {
        const {bookid} = req.headers
        await Book.findByIdAndUpdate(bookid,{
            url:req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            desc:req.body.desc,
            language:req.body.language, 
        })
        return res.status(200).json({message:"book update success"})
    } catch (error) {
        console.log("update book error",error);
        res.status(500).json({message:"Internal server error"})
    }
})

// delete book
router.delete("/delete-book",authenticateToken,async(req,res)=>{
    try {
        const {bookid} = req.headers
        await Book.findByIdAndDelete(bookid)
        return res.status(200).json({message:"book deleted success"})
    } catch (error) {
        console.log("update book error",error);
        res.status(500).json({message:"Internal server error"})
    }
})

// ya public bhi access ke sakti h because isma authenticateToken nahi h

// get all books
router.get("/get-all-books",async(req,res)=>{
    try {
        const books = await Book.find().sort({createdAt:-1})//created at is due to timestamps in database
        return res.json({status:"success",data:books})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
})

//get recently added books with limit 4 (which i have to show on home page)
router.get("/get-recent-books",async(req,res)=>{
    try {
        const books = await Book.find().sort({createdAt:-1}).limit(4)  //createdAt -1 means descending order and 1 means asc order
        return res.json({status:"success",data:books})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
})

// particular book ki all detail fetch
router.get("/get-book-by-id/:id",async(req,res)=>{
    try {
        const {id} = req.params 
        const book = await Book.findById(id)
        return res.json({status:"success",data:book})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
})

module.exports = router