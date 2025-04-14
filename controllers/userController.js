import UserISS from '../models/UserISS.js'


export const getAllUsers = async (req, res) => {
    try {
        const users = await UserISS.find().select('-password')
        if(users.length < 1) return res.status(404).json('No User found')
        return res.status(200).json(users)
    } catch (error) {
        console.log(error)
        return res.status(500).json('Internal Server error')
    }
}

export const getUserByID = async (req, res) => {
    const {id} = req.user
    try {
        const user = await UserISS.findById(id).select('-password')
        if(!user)return res.status(404).json('No User found')
        return res.status(200).json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json('Internal Server error')
    }
}

export const updateUser = async (req, res) => {
    const {id} = req.user
    try {
        if(req.body.password) return res.status(401).json("Password can't be change here")
            const updateUser = await UserISS.findByIdAndUpdate(id, req.body)
            return res.status(200).json('User has been modified')
    } catch (error) {
        console.log(error)
        return res.status(500).json('Internal Server error')
    }
}

export const deleteUser = async (req, res) => {
    const {id} = req.user
    try {
        if(!id) return res.status(404).json("No user found")
        const deleteUser = await UserISS.findByIdAndDelete(id)
        return res.status(200).json('User has been deleted')
    } catch (error) {
        console.log(error)
        return res.status(500).json('Internal Server error')
    }
}
