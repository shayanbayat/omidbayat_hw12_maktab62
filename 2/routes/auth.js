// dependencies
const router = require('express').Router()

// middleware
const { checkRegisterInputs, checkLoginInputs, checkResetPassInputs } = require('../middlewares/authentication')

// controller
const { registerPage, register, loginPage, login, resetPassPage, resetPass } = require('../controllers/authentication')

// register
router.route('/register')
    .get(registerPage)
    .post(checkRegisterInputs, register)

router.route('/login')
    .get(loginPage)
    .post(checkLoginInputs, login)

router.route('/reset_password')
    .get(resetPassPage)
    .post(checkResetPassInputs, resetPass)

// export module
module.exports = router