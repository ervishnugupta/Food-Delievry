// require('dotenv').config()
import dotenv from 'dotenv'
dotenv.config()
import express from "express"


import cors from "cors"
import connectDB from "./config/db.js";
import foodRoute from './routes/foodRoute.js'
import userRoute from './routes/userRoute.js'
import cartRoute from './routes/cartRoute.js'
import orderRoute from './routes/orderRoute.js'

const app = express()
const port = process.env.PORT || 3000;


app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

connectDB()

//api endpoints
app.use('/api/food', foodRoute)
app.use('/images', express.static('uploads'))

app.use('/api/user', userRoute)


app.use('/api/cart', cartRoute)

app.use('/api/order',orderRoute )



app.get('/' , (req, res)=>{
    res.send("hello")
})



app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})
