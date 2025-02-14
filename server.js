require('dotenv').config()
const cookieParser = require("cookie-parser")
const express = require("express")
const cors = require('cors')
const mongoose = require("mongoose")
const admineRouter = require("./src/routes/admineRoute")
const productRouter = require("./src/routes/ProductRoute")
const userRouter = require("./src/routes/userRoute")
const cartRouter = require("./src/routes/cartRoute")
const wishListRouter = require("./src/routes/wishListRoute")
const orderRouter = require("./src/routes/orderRoute")
const reviewRouter = require("./src/routes/reviewRoute")
const app = express()
port = process.env.PORT
const db_link = process.env.DB_CONNECT_LINK


mongoose.connect(db_link)
.then(res=>{
    console.log("DB connected Successfully")
})
.catch(err=>{
    console.log("BD not connected")
})

app.use(cors({
    origin: ["https://vibbora.vercel.app/","http://localhost:5173/", 'https://vibbora.vercel.app'],
    methods:["GET","PUT","DELETE","POST","OPTIONS"],
    credentials:true
  }))
app.use(express.json())
app.use(cookieParser())

app.use("/api/products", productRouter)
app.use("/api/user", userRouter)
app.use("/api/admine", admineRouter)
app.use("/api/cart", cartRouter)
app.use("/api/whish-list", wishListRouter )
app.use("/api/order",orderRouter)
app.use("/api/review",reviewRouter)

app.listen(port,()=>{
    console.log("Running in port :",port,)
})