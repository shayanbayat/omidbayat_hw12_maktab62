// dependencies
const router = require('express').Router()
const auth = require('./auth')
const profile = require('./profile')
const admin = require('./admin')

// root route
router.get('/', (req, res) => res.send('Root Route'))

router.use('/auth', auth)
router.use('/profile', profile)
router.use('/admin', admin)

// 404
router.use((req, res) => res.send('404, not found'))

// export module
module.exports = router