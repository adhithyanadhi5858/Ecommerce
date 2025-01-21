require('dotenv').config()
const cookieParser = require("cookie-parser")
const express = require("express")
const mongoose = require("mongoose")
const admineRouter = require("./src/routes/admineRoute")
const productRouter = require("./src/routes/ProductRoute")
const userRouter = require("./src/routes/userRoute")



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

app.use(express.json())
app.use(cookieParser())


app.use("/products", productRouter)
app.use("/user", userRouter)
app.use("/admine",admineRouter)

app.listen(port,()=>{
    console.log("Running in port :",port,)
})