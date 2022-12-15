const express = require('express')
const mongoose = require('mongoose')
const ejs = require('ejs')
const path = require('path')

const authRouter = require('./routes/authRoutes')

const app = express()

app.use(express.json())
app.use(express.static('public'))
app.use(authRouter)


app.set('views' , path.join(__dirname , 'views'))
app.set('view engine' , 'ejs')
app.set('view cache' , true)



const dbURI = 'mongodb://127.0.0.1/node-auth'

mongoose.set('strictQuery', true)
mongoose
    .connect(dbURI)
    .then((result) => app.listen(3000 , () => {
        console.log('Server Listening on port 3000')
    }))
    .catch(err => console.log(err))


app.get('/' , (req , res) => {
    res.render('home', {
        users : ['Ashik' , 'Rabbi' , 'Sani'],

    });
})


app.get('/smoothies' , (req , res) => {
    res.render('smoothies')
})