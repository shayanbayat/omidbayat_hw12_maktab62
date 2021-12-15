// dependencies
const router = require('express').Router()

// middleware
const { isLoggedIn } = require('../middlewares/authentication')
const { isAdmin } = require('../middlewares/authorization')

// controllers
const { adminPage, removeUser, editUser } = require('../controllers/admin')

// routes
router.route('/:username')
    .get(isLoggedIn, isAdmin, adminPage)

router.route('/:username/edit')
    .put(isLoggedIn, isAdmin, editUser)


router.route('/:username/remove_user')
    .delete(isLoggedIn, isAdmin, removeUser)

// export module
module.exports = router