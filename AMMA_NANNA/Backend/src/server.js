import express from 'express'
import dotEnv from 'dotenv'
import mongoose from 'mongoose'
import userRoutes from './routes/userRoutes.js'
import noteRoutes from './routes/noteRoutes.js'
import errorHandler from './middleware/errorMiddleware.js'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 4000

dotEnv.config()

mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("Mongo connected success"))
    .catch((error)=>console.log("MongoDB connection Error",error))

app.use(cors())
app.use(express.json())

app.use('/user',userRoutes)
app.use('/notes',noteRoutes)
app.use('/uploads',express.static("uploads"))
    
app.use('/home', (req, res)=>{
    res.send("<h1> Welcome to NoteMaking")
})

app.listen(PORT , () => {
    console.log(`Server started and running at ${PORT}`)
})

app.use(errorHandler)


