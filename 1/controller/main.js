const { join } = require('path')
const db = require('../db/products.json')
function homePage(req, res) {
    let products = db
    if (req.query?.search) {
        products = db.filter(product => {
            return product.title.includes(req.query.search)
                || product.description.includes(req.query.search)
                || product.price.toString().includes(req.query.search)
        })
    }
    res.render('home', { products })
}

function productPage(req, res) {
    let productId = req.params.id
    let product = db.find(p => p.id === +productId)
    console.log(product)
    res.render('product', { product })
}

function aboutPage(req, res) {
    res.render('about')
}

function contactPage(req, res) {
    res.render('contact')
}

function notFoundPage(req, res) {
    res.render('404')
}

// export functions
module.exports = { homePage, productPage, aboutPage, contactPage, notFoundPage }