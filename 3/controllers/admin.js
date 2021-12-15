// dependencies
const fs = require('fs')
const path = require('path')

// model
const users = require('../models/users.json')

// functions
function adminPage(req, res) {
    const admin = users.find(u => u.role === 'admin')
    const justUsers = users.filter(u => u.role === 'user')
    res.render('admin/panel', { admin, users: justUsers })
}

function editUser(req, res) {
    const user = users.find(u => u.id === Number(req.body.id))
    if (!user) {
        return res.status(400).send({ success: false, message: 'User not found.' })
    }
    user.username = req.body.username
    user.email = req.body.email
    user.gender = req.body.gender
    fs.writeFile(path.join(__dirname, '../models/users.json'), JSON.stringify(users), (err) => {
        if (err) return console.log(`Error in udpate user: ${err.message}`)
        return res.status(200).send({ success: true, message: 'User updated successfully.' })
    })
}

function removeUser(req, res) {
    const user = users.find(u => u.id === Number(req.body.id))
    if (!user) {
        return res.status(400).send({ success: false, message: 'User not found.' })
    }
    const filteredUsers = users.filter(u => u.id !== user.id)
    fs.writeFile(path.join(__dirname, '../models/users.json'), JSON.stringify(filteredUsers), (err) => {
        if (err) return console.log(`Error in create user: ${err.message}`)
        return res.status(200).send({ success: true, message: 'User deleted successfully.' })
    })
}

// export
module.exports = { adminPage, removeUser, editUser }