import "dotenv/config.js"

import express from "express"
import mongoose from "mongoose"
//Route imports
import closetItemRouter from "./routes/closetItemRoute.js"
import itemTagRouter from "./routes/itemTagRoute.js"
import userRouter from "./routes/userRoute.js"


const app = express()
const PORT = process.env.PORT || 3000

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

//Use Rotes
app.use('/closetItem', closetItemRouter)
app.use('/itemTag', itemTagRouter)
app.use('/user', userRouter)


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})