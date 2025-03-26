const mongoose = require("mongoose")

mongoose.connect(`${process.env.URI}`).then(()=>{
    console.log("Mongodb connected");
}).catch((error)=>{
    console.log("mongodb error",error);
})


// const conn = async()=>{
// try {
//     await mongoose.connect(`${process.env.URI}`)
//     console.log("connected success");
    
// } catch (error) {
//     console.log("connection error",error);
    
// }
// }
// conn()
