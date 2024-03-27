import Comment from '../models/comment.js'
import User from '../models/user.js'



export const register = async (req,res) =>{
    try{
        const user = await User.create(req.body)
        res.status(201).json(user)
    }catch(err){
        res.status(400).json(err.message)
    }
}

export const login = async (req,res) =>{
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user){
            return res.status(404).json('user not found')
        }
        if(user.password !== req.body.password){
            return res.status(303).json('password not correct')
        }
        res.status(200).json(user)
    } catch (err) {
       res.json(err.message) 
    }
}

export const comment = async (req,res) =>{
    try {
        const user = await User.findOne({email: req.body.email})
        const comment = await Comment.create({
            user: user.email,
            comment: req.body.comment
        })
        user.comments.push(comment)
        user.save()
        res.status(201).json(comment)
    } catch (err) {
       res.json(405).json(err.message) 
    }
}