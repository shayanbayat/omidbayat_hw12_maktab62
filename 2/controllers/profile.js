// dependencies
const fs = require('fs')
const path = require('path')

// model
const users = require('../models/users.json')

// helper
const { checkResetPassToken } = require('../helpers')

// functions
function profilePage(req, res) {
    const user = users.find(u => u.username === req.params.username)
    res.render('profile', { user })
}

function editProfilepage(req, res) {
    const user = users.find(u => u.username === req.params.username)
    res.render('editProfile', { user, messages: [] })
}

function editProfile(req, res) {
    const user = users.find(u => u.username === req.params.username)
    if (res.locals.error) {
        return res.render('editProfile', { user, messages: res.locals.errorMsg })
    } else {
        user.email = req.body.email
        user.password = req.body.new_password
        fs.writeFile(path.join(__dirname, '../models/users.json'), JSON.stringify(users), (err) => {
            if (err) return console.log(`Error in create user: ${err.message}`)
            res.redirect(`/profile/${user.username}`)
        })
    }
}

function logout(req, res) {
    const user = users.find(u => u.username === req.params.username)
    user.isLoggedIn = false
    fs.writeFile(path.join(__dirname, '../models/users.json'), JSON.stringify(users), (err) => {
        if (err) return console.log(`Error in create user: ${err.message}`)
        res.redirect('/auth/login')
    })
}

function resetPassPage(req, res) {
    const user = users.find(u => u.username === req.params.username)
    if (user.isLoggedIn) {
        return res.redirect(`/profile/${user.username}`)
    }
    if (!req.params.token) {
        return res.redirect('/auth/reset_password')
    }
    if (!checkResetPassToken(user.username, req.params.token)) {
        return res.redirect('/auth/reset_password')
    }
    res.render('resetPass', { user, messages: [] })
}

function resetPass(req, res) {
    const user = users.find(u => u.username === req.params.username)
    if (!req.params.token) {
        return res.render('resetPass', { user, messages: ['توکن موجود نیست.'] })
    }
    if (!checkResetPassToken(user.username, req.params.token)) {
        return res.render('resetPass', { user, messages: ['توکن اشتباه است.'] })
    }
    let passRegex = /((?=.*[\d])(?=.*[a-zA-Z]).{8,})/
    if (!passRegex.test(req.body.new_password)) {
        return res.render('resetPass', { user, messages: ['رمز عبور باید شامل ۸ کاراکتر و حداقل یک حرف و یک عدد باشد.'] })
    }
    user.password = req.body.new_password
    fs.writeFile(path.join(__dirname, '../models/users.json'), JSON.stringify(users), (err) => {
        if (err) return console.log(`Error in create user: ${err.message}`)
        res.redirect(`/auth/login`)
    })
}

// export
module.exports = { profilePage, editProfilepage, editProfile, logout, resetPassPage, resetPass }