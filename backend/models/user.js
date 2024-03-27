import mongoose from 'mongoose'

const user = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email:{
        type: String,
    },
    password:{
        type: String,
        required: true,
        length: [6, 'password can not be lessthan 6']
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    guest:{
        type: Boolean,
        default: false
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    }],
    favorites: Array 
})

const User = mongoose.model('user', user)

export default User