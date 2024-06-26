import "dotenv/config.js"

import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser"
//Route imports
import authRouter from "./routes/authRoute.js"
import closetItemRouter from "./routes/closetItemRoute.js"
import itemTagRouter from "./routes/itemTagRoute.js"
import userRouter from "./routes/userRoute.js"
import morgan from 'morgan'

const app = express()
const PORT = process.env.PORT || 7777
const corsOptions = { 
  origin: [['http://localhost:5173', 'http://127.0.0.1:5173']], 
  credentials: true
}
mongoose.connect(process.env.DATABASE_URL)
.then(() => {
  console.log("Connected to MongoDB")
})
.catch((error) => {
  console.log("Error connecting to MongoDB")
  console.log(error)
})

//middleware
app.use(express.json())
app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(cookieParser())

//Use Rotes
app.use('/closetItem', closetItemRouter)
app.use('/itemTag', itemTagRouter)
app.use('/user', userRouter)
app.use('/auth', authRouter)


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})