const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    email : {
        type : String,
        required: [ true , 'Email is required'],
        unique : true,
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

userSchema.statics.login = async  function (email , password) {
    const user = await this.findOne({ email })
    if(user){
        const auth = await bcrypt.compare(password , user.password);
        if(auth){
            return user;
        }
        throw Error('Incorrect Password')
    }
    throw Error('Email dont exist')
}

const User = mongoose.model('user' , userSchema)

module.exports = User

