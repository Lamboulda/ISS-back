import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if(!token){
        return res.status(401).json({message: 'Missing token'})
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        if(error instanceof jwt.JsonWebTokenError){
            return res.status(403).json({error: 'Invalid token'})
        }
        if(error instanceof jwt.TokenExpiredError){
            return res.status(403).json({error: 'Token expired'})
        }
        return res.status(500).json({error: 'Error while verificating the token'})
    }
}
export default verifyToken