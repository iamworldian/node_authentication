const jwt = require('jsonwebtoken')
const _ = require('underscore')

const User = require('../models/userModel')

const getToken = (id) => {
    return jwt.sign({ id } , 'jood' , {
        expiresIn : 1000 * 60,
    })
}

const handleRequestError = (err) => {
    let report = { errors : { } }
    //console.log(err.message)

    if(err.code === 11000){
        report.errors.email = 'Email - Already Exist'
        return report
    }

    if(err.message === 'Incorrect Password'){
        report.errors.password = "Incorrect Password"
        return report
    }

    if(err.message === 'Email dont exist'){
        report.errors.email = "Email dont exist"
        return report
    }

    Object.values(err.errors).forEach(({properties}) => {
        report.errors[properties.path] = properties.message
    })
    
    return report;
}

const controller = {}

controller.sigunpGet = (req , res) => {
    res.render('signupGet')
}

controller.sigunpPost = async (req , res) => {

    const {email , password} = req.body

    try{
        await User
                .create({email,password}) 
                .then(result => res
                    .status(201)
                    .cookie('jwt', getToken(result._id))
                    .send(_.pick(result , ['_id' , 'email'])))
    } catch (err) {
        
        res.status(400).json(handleRequestError(err))
    }
}

controller.loginGet =  (req , res) => {
    res.render('loginGet')
}

controller.loginPost = async (req , res) => {
    const {email , password} = req.body
    try{
        const user = await User.login(email,password)
        console.log(user)

        res.status(200)
        .cookie('jwt' , getToken(user._id))
        .json({_id : user._id})

    } catch (err) {
        const rep = handleRequestError(err)
        console.log(rep)
        res.status(401).send(rep)

    }
}

module.exports = controller

