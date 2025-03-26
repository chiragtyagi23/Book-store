const express = require("express")
const router = express.Router()
const authenticateToken = require("./userAuth")
const User = require("../models/users")
const Order = require("../models/orders")
const Book = require("../models/books")

//place order
// router.post("/place-order",authenticateToken,async(req,res)=>{
//     try {
//         const {id} = req.headers
//         const {order} = req.body
//         for(const orderData of order){
//             const newOrder = new Order({user:id, book:orderData._id})
//             const orderDataFormDb = await newOrder.save()
//             //save order into usermodel
//             await User.findByIdAndUpdate(id,{$push:{orders:orderDataFormDb._id}})
//             //clearing part
//             await User.findByIdAndUpdate(id,{$pull:{cart:orderData._id}})
//             return res.json({status:"success",message:"order places success"})
//         }
//     } catch (error) {
//         return res.status(500).json({message: "Internal server error"})
//     }
// })

router.post("/place-order", authenticateToken, async (req, res) => {
    try {
      const { id } = req.headers;
      const { order } = req.body;
  
      if (!order || !Array.isArray(order)) {
        return res.status(400).json({ message: "Invalid order data" });
      }
  
      const orderIds = [];
  
      for (const orderData of order) {
        const newOrder = new Order({ user: id, book: orderData._id });
        const orderDataFormDb = await newOrder.save();
        await User.findByIdAndUpdate(id, { $push: { orders: orderDataFormDb._id } });
        await User.findByIdAndUpdate(id, { $pull: { cart: orderData._id } });
        orderIds.push(orderDataFormDb._id);
      }
  
      return res.json({
        status: "success",
        message: "Order placed successfully",
        orders: orderIds,
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  

//user order history
router.get("/get-order-history",authenticateToken,async(req,res)=>{
    try {
        const {id} = req.headers
        const userData = await User.findById(id).populate({
            path:"orders",
            populate:{path:"book"}
        })

        const ordersData = userData.orders.reverse()
        return res.json({
            status:"success",
            data: ordersData,
        })
        
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
})

//get all orders ---admin
router.get("/get-all-orders",authenticateToken,async(req,res)=>{
    try {
        const userData = await Order.find()
        .populate({
            path: "book",
        })
        .populate({
            path: "user",
        }).sort({createdAt:-1})
        
        return res.json({
            status:"success",
            data: userData,
        })
        
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
})

//update order --admin
router.put("/update-status/:id",authenticateToken,async(req,res)=>{
    try {
        const {id} = req.params
        await Order.findByIdAndUpdate(id,{ status :req.body.status})

        return res.json({
            status:"success",
            message: "status updated success",
        })
        
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
})

module.exports = router