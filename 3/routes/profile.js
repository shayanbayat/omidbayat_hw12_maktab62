// dependencies
const router = require('express').Router()

// middleware
const { isLoggedIn } = require('../middlewares/authentication')
const { checkEditInputs } = require('../middlewares/profile')

// controller
const { profilePage, editProfilepage, editProfile, logout, resetPassPage, resetPass } = require('../controllers/profile')


router.route('/:username')
    .get(isLoggedIn, profilePage)

router.route('/:username/edit')
    .get(isLoggedIn, editProfilepage)
    .post(isLoggedIn, checkEditInputs, editProfile)

router.route('/:username/logout')
    .get(isLoggedIn, logout)

router.route('/:username/reset_password/:token')
    .get(resetPassPage)
    .post(resetPass)


// export module
module.exports = router