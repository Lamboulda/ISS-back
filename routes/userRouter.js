import { Router } from "express"
import { deleteUser, getAllUsers, getUserByID, updateUser } from '../controllers/userController.js'
import verifyToken from '../middlewares/verifyToken.js'


const userRouter = Router()

userRouter.get('/users', getAllUsers)
userRouter.get('/user/:id',verifyToken, getUserByID)
userRouter.put('/user/:id',verifyToken, updateUser)
userRouter.delete('/user/:id',verifyToken, deleteUser)


export default userRouter