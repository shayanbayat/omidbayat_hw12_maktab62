// dependencies
const fs = require('fs')
const path = require('path')

// model
const users = require('../models/users.json')

// helper
const { lastId, resetPassToken } = require('../helpers')

// functions
function registerPage(req, res) {
    res.render('auth/register', { messages: [] })
}

function register(req, res) {
    
    if (res.locals.error) {
        res.render('auth/register', { messages: res.locals.errorMsg })
    } else {
        const user = {
            id: lastId(users) + 1,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            gender: req.body.gender ? req.body.gender : 'male',
            isLoggedIn: false
        }
        users.push(user)
        fs.writeFile(path.join(__dirname, '../models/users.json'), JSON.stringify(users), (err) => {
            if (err) return console.log(`Error in create user: ${err.message}`)
            res.redirect('login')
        })
    }
}

function loginPage(req, res) {
    res.render('auth/login', { messages: [] })
}

function login(req, res) {

    if (res.locals.error) {
        return res.render('auth/login', { messages: res.locals.errorMsg })
    } else {
        const user = users.find(u => u.username === req.body.username)
        user.isLoggedIn = true
        fs.writeFile(path.join(__dirname, '../models/users.json'), JSON.stringify(users), (err) => {
            if (err) return console.log(`Error in create user: ${err.message}`)
            res.redirect(`/profile/${user.username}`)
        })
    }
}

function resetPassPage(req, res) {
    res.render('auth/resetPass', { messages: [] })
}

function resetPass(req, res) {
    if (res.locals.error) {
        return res.render('auth/resetPass', { messages: res.locals.errorMsg })
    } else {
        const token = resetPassToken(req.body.username)
        res.redirect(`/profile/${req.body.username}/reset_password/${token}`)
    }
}

// export
module.exports = { registerPage, register, loginPage, login, resetPassPage, resetPass }