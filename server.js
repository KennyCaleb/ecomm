// import modules
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const customersRouter = require("./route/customersRoutes")

// connect server to database
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Database connection established")
})
.catch((err)=>{
    console.log(err)
})


// middlewares
app.use(express.json())
app.use("/api/customers", customersRouter)


// create server
const PORT = 5000
app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`)
})