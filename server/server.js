import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'

// Routers
import userRouter from './routes/user.js'
import productRouter from './routes/product.js'
import cartRouter from './routes/cart.js'


// App Config
const app = express()
const PORT = process.env.PORT || 3000
connectDB()
connectCloudinary();

// Middlewares
app.use(express.json())
app.use(cors())

// API Endpoints
app.use('/api/user/', userRouter)
app.use('/api/products/', productRouter)
app.use('/api/cart/', cartRouter)


app.listen(PORT, () => {
  console.log("server is running on port: ", PORT)
})