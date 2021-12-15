// modules
const express = require('express')
const { join } = require('path')
const router = require('./routes')

// create express app
const app = express()
const PORT = 1203

// set ejs engine
app.set('view engine', 'ejs')
app.set('views', join(__dirname, './views'))

// body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// serve public files
app.use(express.static(join(__dirname, 'public')))

// router
app.use(router)

// createAdmin
const { createAdmin } = require('./models')
createAdmin()

app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`)
})

