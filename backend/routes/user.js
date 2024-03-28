import express from 'express'
import * as controller from '../controllers/userController.js'
const userRoute = express.Router()

userRoute.post('/register', controller.register)

userRoute.post('/login', controller.login)
userRoute.post('/comment/:slug', controller.comment)
userRoute.post('/reply/:id/:slug', controller.comment_reply)
userRoute.get('/get-comments/:slug', controller.get_comments)
userRoute.get('/get-comment/:id', controller.get_comment)
userRoute.get('/get-reply/:commentId/:replyId', controller.get_reply_comment)
userRoute.post('/post-reply/:commentId/:replyId', controller.post_reply_comment)

export default userRoute