const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    firstname: {
        type:String,
        required:true,
    },
    lastname: String,
    phonenumber: {
        type:String,
        unique:true,
        required:true,
    },
    password: {
        type:String,
        required:true,
    },
},{ timestamps: { createdAt: 'created_at' } })

const Users = mongoose.model('User', userSchema)
module.exports = Users;