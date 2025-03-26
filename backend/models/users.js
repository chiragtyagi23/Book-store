const mongoose = require("mongoose")

const user = new mongoose.Schema({
    username : {
        type:String,
        required:true,
        unique:true
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    password : {
        type:String,
        required:true
    },
    address : {
        type:String,
        required:true
    },
    avatar : {
        type:String,
        default:"https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
    },
    role:{
        type:String,
        default:"user",
        enum:["user","admin"]
    },
    favourates:[{
        type:mongoose.Types.ObjectId,  // It means that the favourites field stores an array of IDs.
        ref:"books",  // Each ID in the array refers to a document from the books collection.
    }],
    cart:[{
        type:mongoose.Types.ObjectId,  
        ref:"books",  
    }],
    orders:[{
        type:mongoose.Types.ObjectId,  
        ref:"order",  
    }],
    
},{timestamps:true})  // means of this timestamps means sorted raha jo pehla vo pehla raha

module.exports = mongoose.model("user",user)