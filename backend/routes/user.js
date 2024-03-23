import express from 'express'
import * as controller from '../controllers/userController.js'
const userRoute = express.Router()

userRoute.post('/register', controller.register)

export default userRoute