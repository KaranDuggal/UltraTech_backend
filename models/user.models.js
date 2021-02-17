const mongoose = require('mongoose')
// var validateEmail = function(email) {
//     var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     return re.test(email)
// };
const userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: {
        type:String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        // validate: [validateEmail, 'Please fill a valid email address'],
        // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: String,
},{ timestamps: { createdAt: 'created_at' } })

const Users = mongoose.model('User', userSchema)
module.exports = Users;