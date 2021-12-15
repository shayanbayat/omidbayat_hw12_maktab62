// dependencies
const fs = require('fs')
const path = require('path')

// fake db
const users = require('./users.json')

// helper
const { lastId } = require('../helpers')

function createAdmin() {
    const admin = users.find(u => u.role === 'admin')
    if (!admin) {
        const user = {
            id: lastId(users) + 1,
            username: "admin",
            password: "admin",
            email: "admin@maktab.com",
            gender: "male",
            isLoggedIn: false,
            role: "admin"
        }
        fs.writeFile(path.join(__dirname, './users.json'), JSON.stringify([user]), (err) => {
            if (err) return console.log('There is somthing wrong in admin user creatation.')
            return console.log('Admin has been created successfully.')
        })
    }
    return console.log('Admin has existed.')
}

module.exports = { createAdmin }