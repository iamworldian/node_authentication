
const User = require('../models/userModel')

const handleRequest = (err) => {
    let report = {}

    if(err.code === 11000){
        report.email = 'Email Already Exist'
        return report
    }

    Object.values(err.errors).forEach(({properties}) => {
        report[properties.path] = properties.message
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
                .then(result => res.status(201).send(result))
    } catch (err) {
        
        res.status(400).json(handleRequest(err))
    }
}

controller.loginGet = (req , res) => {
    res.render('loginGet')
}

controller.loginPost = (req , res) => {
    res.render('loginPost')
}

module.exports = controller

