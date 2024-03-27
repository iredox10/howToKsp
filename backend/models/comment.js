import mongoose, { Schema } from 'mongoose'

const comment = new mongoose.Schema({
    user:{
        type: String,
        required: true
    },
    comment:{
        type: String,
        required: true
    },
},{timestamps:true})

const Comment = mongoose.model('comment',comment)

export default Comment