import express from 'express'
import cors from 'cors'
import connectDB from './database/db.js'
import userRouter from './routes/userRouter.js'
import 'dotenv/config'
import authRouter from './routes/authRouter.js'

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req,res) =>{
    return res.send('Welcome to tracker-ISS')
})

app.use('/api', userRouter, authRouter)

connectDB()
app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})