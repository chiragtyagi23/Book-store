const mongoose = require("mongoose")

const order = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    book:{
        type:mongoose.Types.ObjectId,
        ref:"books"
    },
    status:{
        type:String,
        default:"order placed",
        enum:["order placed","out of stock,delivered,cancelled"]
    }
},{timestamps:true})  //recent order top pa rehna ka liya i uses timestamps

module.exports = mongoose.model("order",order)