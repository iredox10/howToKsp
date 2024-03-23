import User from '../models/user.js'
export const register = async (req,res) =>{
    try{
        const user = await User.create(req.body)
        res.status(201).json(user)
    }catch(err){
        res.status(400).json(err.message)
    }
}