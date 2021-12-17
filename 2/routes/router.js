const express = require('express')
const router = express.Router()
const users = require('../models/users.json')
const fs = require("fs");
const path = require("path");
////////////////////////control//////////////////////////
function login(req, res) {

    if (res.locals.error) {
        return res.render('login', { messages: res.locals.errorMsg })
    } else {
        const user = users.find(u => u.username === req.body.username)
        user.isLoggedIn = true
        fs.writeFile(path.join(__dirname, '../models/users.json'), JSON.stringify(users), (err) => {
            if (err) return console.log(`Error in create user: ${err.message}`)
            res.redirect(`/profile/${user.username}`)
        })
    }
}
function profilePage(req, res) {
    const user = users.find(u => u.username === req.params.username)
    res.render('profile', { user })
}
function editProfilepage(req, res) {
    const user = users.find(u => u.username === req.params.username)
    res.render('edit', { user, messages: [] })
}
function resetPassPage(req, res) {
    res.render('reset_pass', { messages: [] })
}
function resetPassPageEnd(req, res) {
    res.render('reset_pass_end', { messages: [] })
}
///////////////////////////////////////////////////////



////////////////midelwarel//////////////////////////
function register(req, res) {

    if (res.locals.error) {
        res.render('signup', { messages: res.locals.errorMsg })
    } else {
        const user = {
            id: 2,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            gender: req.body.gender,
            isLoggedIn: false
        }
        users.push(user)
        fs.writeFile(path.join(__dirname, '../models/users.json'), JSON.stringify(users), (err) => {
            if (err) return console.log(`Error in create user: ${err.message}`)
            res.redirect('/login')
        })
    }
}
function checkRegisterInputs(req, res, next) {
    res.locals = {
        error: false,
        errorMsg: []
    }
    if (!req.body.username) {
        res.locals.error = true
        res.locals.errorMsg.push('نام کاربری اجباری است.')
    } else {
        const foundUser = users.find(u => u.username === req.body.username)
        if (foundUser) {
            res.locals.error = true
            res.locals.errorMsg.push('این نام کاربری در دسترس نیست.')
        }
    }
    if (!req.body.email) {
        res.locals.error = true
        res.locals.errorMsg.push('ایمیل اجباری است.')
    } else {
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (!emailRegex.test(req.body.email)) {
            res.locals.error = true
            res.locals.errorMsg.push('ایمیل نادرست است.')
        }
    }
    if (!req.body.password) {
        res.locals.error = true
        res.locals.errorMsg.push('رمز عبور اجباری است.')
    } else {
        let passRegex = /((?=.*[\d])(?=.*[a-zA-Z]).{8,})/
        if (!passRegex.test(req.body.password)) {
            res.locals.error = true
            res.locals.errorMsg.push('رمز عبور باید شامل ۸ کاراکتر و حداقل یک حرف و یک عدد باشد.')
        }
    }
    next()
}
function checkLoginInputs(req, res, next) {
    res.locals = {
        error: false,
        errorMsg: []
    }
    if (!req.body.username || !req.body.password) {
        res.locals.error = true
        res.locals.errorMsg.push('نام کاربری و رمز عبور اجباری است.')
    } else {
        const foundUser = users.find(u => u.username === req.body.username)
        if (!foundUser) {
            res.locals.error = true
            res.locals.errorMsg.push('نام کاربری اشتباه است.')
        } else {
            if (foundUser.password !== req.body.password) {
                res.locals.error = true
                res.locals.errorMsg.push('رمز عبور اشتباه است.')
            }
        }
    }
    next()
}
function isLoggedIn(req, res, next) {
    const foundUser = users.find(u => u.username === req.params.username)
     if (!foundUser || !foundUser?.isLoggedIn) {
        return res.redirect('/login')
    }
    next()
}
function logout(req, res) {
    const user = users.find(u => u.username === req.params.username)
    user.isLoggedIn = false
    fs.writeFile(path.join(__dirname, '../models/users.json'), JSON.stringify(users), (err) => {
        if (err) return console.log(`Error in create user: ${err.message}`)
        res.redirect('/login')
    })
}
function checkEditInputs(req, res, next) {
    res.locals = {
        error: false,
        errorMsg: []
    }
    if (!req.body.email) {
        res.locals.error = true
        res.locals.errorMsg.push('ایمیل اجباری است.')
    } else {
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (!emailRegex.test(req.body.email)) {
            res.locals.error = true
            res.locals.errorMsg.push('ایمیل نادرست است.')
        }
    }
    if (req.body.password) {
        const user = users.find(u => u.username === req.params.username)
        if (user.password !== req.body.password) {
            res.locals.error = true
            res.locals.errorMsg.push('رمز عبور کنونی اشتباه است.')
        } else {
            let passRegex = /((?=.*[\d])(?=.*[a-zA-Z]).{8,})/
            if (!passRegex.test(req.body.new_password)) {
                res.locals.error = true
                res.locals.errorMsg.push('رمز عبور جدید باید شامل ۸ کاراکتر و حداقل یک حرف و یک عدد باشد.')
            }
        }
    }
    next()
}
function editProfile(req, res) {
    const user = users.find(u => u.username === req.params.username)
    if (res.locals.error) {
        return res.render('edit', { user, messages: res.locals.errorMsg })
    } else {
        user.username = req.body.username
        user.email = req.body.email
        user.password = req.body.new_password
        user.gender = req.body.gender
        fs.writeFile(path.join(__dirname, '../models/users.json'), JSON.stringify(users), (err) => {
            if (err) return console.log(`Error in create user: ${err.message}`)
            res.redirect(`/profile/${user.username}`)
        })
    }
}
function checkResetPassInputs(req, res, next) {
    console.log(req.body.username)
    res.locals = {
        error: false,
        errorMsg: [],
    }
    if (!req.body.username || !req.body.email) {
        res.locals.error = true
        res.locals.q_login = false
        res.locals.errorMsg.push('نام کاربری و ایمیل اجباری است.')
    } else {
        const foundUser = users.find(u => u.username === req.body.username)
        if (!foundUser) {
            res.locals.error = true
            res.locals.q_login = false
            res.locals.errorMsg.push('نام کاربری اشتباه است.')
        } else {
            if (foundUser.email !== req.body.email) {
                res.locals.error = true
                res.locals.q_login = false
                res.locals.errorMsg.push('ایمیل اشتباه است.')
            }
        }
    }
    next()
}
function resetPass(req, res) {
    if (res.locals.error) {
        return res.render('reset_pass', { messages: res.locals.errorMsg })
    } else {
        const user = users.find(u => u.username === req.body.username)
        user.password = "wait to change"
        fs.writeFile(path.join(__dirname, '../models/users.json'), JSON.stringify(users), (err) => {
            if (err) return console.log(`Error in create user: ${err.message}`)
            res.redirect(`/reset_pass/end/${req.body.username}`)
        })
    }
}
function newPass(req,res){
    const user = users.find(u => u.username === req.params.username)
    let passRegex = /((?=.*[\d])(?=.*[a-zA-Z]).{8,})/
    console.log(req.body.new_pass)
    if (!passRegex.test(req.body.new_pass)) {
        return res.render('reset_pass_end', {messages: ['رمز عبور باید شامل ۸ کاراکتر و حداقل یک حرف و یک عدد باشد.'] })
    }
    if(req.body.new_pass !== req.body.new_pass2){
        return res.render('reset_pass_end', {messages: ['رمز های وارد شده با هم یکسان نیست'] })
    }
    if(user.password === "wait to change") {
        user.password = req.body.new_pass
        fs.writeFile(path.join(__dirname, '../models/users.json'), JSON.stringify(users), (err) => {
            if (err) return console.log(`Error in create user: ${err.message}`)
            res.redirect(`/login`)
        })
    }
    else {
        return res.render('reset_pass_end', {messages: ['شما مجاز به انجام این عملیات نیستید'] })
    }

}
//////////////////////////////////////////////////


router.get("/login",(req,res)=>{
    res.render("login.ejs",{ messages: [] })
})
router.get("/signup",(req,res)=>{
    res.render("signup.ejs",{ messages: '' })
})
router.post("/signup",checkRegisterInputs,register)
router.get("/profile/:username",isLoggedIn,profilePage)
router.get("/profile/:username/logout",isLoggedIn,logout)
router.get('/profile/:username/edit/',isLoggedIn,editProfilepage)
router.post('/profile/:username/edit/',isLoggedIn,checkEditInputs,editProfile)
router.get('/profile/:username/reset_pass/',)
router.post('/profile/:username/reset_pass/',)
router.post("/login",checkLoginInputs,login)
router.get("/reset_pass",resetPassPage)
router.post("/reset_pass",checkResetPassInputs,resetPass)
router.get("/reset_pass/end/:username",resetPassPageEnd)
router.post("/reset_pass/end/:username",newPass)



module.exports = router