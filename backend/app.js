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
const path = require("path")

const _dirname = path.resolve()

app.use(cors())

app.use(express.json())
app.use("/api/v1",user)

app.use("/api/v1",Books)

app.use("/api/v1",Favourite)

app.use("/api/v1",Cart)

app.use("/api/v1",Order)


app.use(express.static(path.join(_dirname,"/frontend/dist")))
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"))
})


app.listen(process.env.PORT || 8080,()=>{
    console.log(`listening at port - ${process.env.PORT}`);
    
})