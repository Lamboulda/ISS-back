import UserISS from '../models/UserISS.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET

export const createUser = async (req, res) => {
    const { username, email, password} = req.body
    try {
        const emailVerification = await UserISS.findOne({email})
        if(emailVerification){
            return res.status(401).json('Email already taken')
        }
        const saltPassword = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, saltPassword)

        const createUser = await UserISS.create({username, email, password : hashedPassword})

        return res.status(201).json(`Welcomme to new user ${username}`)
    } catch (error) {
        console.log(error)
        return res.status(500).json('Internal Server error')
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await UserISS.findOne({email})
        if (!user) return res.status(401).json('Email or password incorrect')
        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) return res.status(401).json('Email or password incorrect')
        if (comparePassword) {
            const token = await jwt.sign({id: user._id}, JWT_SECRET)
            return res.status(200).json({message: `Welcome to ${user.username}`, token})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json('Internal Server error')
    }
}