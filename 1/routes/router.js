const router = require('express').Router()

const { homePage, productPage, aboutPage, contactPage, notFoundPage } = require('../controller/main')

router.get('/', (req, res) => res.send('Root Route')) // root page
router.get('/home', homePage) // home page
router.get('/about', aboutPage) // about page
router.get('/contact', contactPage) // contact page
router.get('/productId/:id', productPage) // product page
router.use(notFoundPage) // 404


module.exports = router