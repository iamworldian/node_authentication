const { Router } = require('express')

const controller = require('../controller/authController')

const router = Router()

router.get('/signup' , controller.sigunpGet)


router.post('/signup' , controller.sigunpPost)


router.get('/login' , controller.loginGet)


router.post ('/login' , controller.loginPost)

module.exports = router