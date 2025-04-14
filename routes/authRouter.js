import { Router } from "express"
import { createUser, login } from "../controllers/authController.js"
import verifyFields from '../middlewares/verifyFields.js'

const authRouter = Router()

authRouter.post('/register',verifyFields, createUser)
authRouter.post('/login', login)


export default authRouter