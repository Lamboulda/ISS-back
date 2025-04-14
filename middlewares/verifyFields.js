const verifyFields = (req, res, next) => {
    const {username, email, password} = req.body
    try {
        if(!username || !email || !password) {
            return res.status(401).json('All fields is required')
        }
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json('Internal Server error')
    }
}

export default verifyFields