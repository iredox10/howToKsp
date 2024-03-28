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
    replies: [{
        user: String,
        comment: String,
        replies: [{
            user: String,
            comment:String
        }]
    },{timestamps:true}]
},{timestamps:true})

const Comment = mongoose.model('comment',comment)

export default Comment