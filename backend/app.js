const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()
require("./conn/conn")
const user = require("./routes/users")
const Books = require("./routes/book")
const Favourite = require("./routes/favourite")
const Cart = require("./routes/cart")
const Order = require("./routes/orders")

app.use(cors())

app.use(express.json())
app.use("/api/v1",user)

app.use("/api/v1",Books)

app.use("/api/v1",Favourite)

app.use("/api/v1",Cart)

app.use("/api/v1",Order)

app.get("/",(req,res)=>{
    res.send("Home page")
})

app.listen(process.env.PORT,()=>{
    console.log(`listening at port - ${process.env.PORT}`);
    
})