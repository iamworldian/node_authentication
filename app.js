const express = require('express')
const mongoose = require('mongoose')
const ejs = require('ejs')
const path = require('path')
const cookieParser = require('cookie-parser')

const authRouter = require('./routes/authRoutes')
const auth = require('./middleware/authMiddleware')

const app = express()

app.use(express.json())
app.use(express.static('public'))
app.use(authRouter)
app.use(cookieParser())

app.set('views' , path.join(__dirname , 'views'))
app.set('view engine' , 'ejs')




const dbURI = 'mongodb://127.0.0.1/node-auth'

mongoose.set('strictQuery', true)
mongoose
    .connect(dbURI)
    .then((result) => app.listen(3000 , () => {
        console.log('Server Listening on port 3000')
    }))
    .catch(err => console.log(err))


app.get('/' , auth , (req , res) => {
    res.render('home', {
        users : ['Ashik' , 'Rabbi' , 'Sani'],

    });
})


app.get('/smoothies' , auth , (req , res) => {
    res.render('smoothies')
})

// app.get('/cookieSet' , (req ,res) => {

//     res.cookie('isok', true)
//     res.cookie('isfalse', true)
//     res.cookie('isChanga', true)
//     res.send();

// })


// app.get('/cookieGet' , (req ,res) => {

//     console.log(req.cookies)
//     res.send();

// })