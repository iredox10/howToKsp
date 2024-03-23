import mongoose from 'mongoose'

const user = new mongoose.Schema({
    name: {
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
    }
})

const User = mongoose.model('user', user)

export default User