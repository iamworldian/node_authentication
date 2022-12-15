const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    email : {
        type : String,
        required: [ true , 'Email is required'],
        unique : [true , 'Email Already exist '],
        lowercase : true,
        validate : [ isEmail , 'Email is invalid']
    },
    password : {
        type : String,
        required : [true , 'Password is required'],
        minLength : [8 , 'Minimum password length is 8 character']
    }
})

userSchema.pre('save' , async function (next) {
    const salt = await bcrypt.genSalt(5)
    this.password = await bcrypt.hash(this.password , salt)
    next()
})

const User = mongoose.model('user' , userSchema)

module.exports = User

