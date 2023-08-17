require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const routes = require('./router/routes')

// express app
const app = express()


// use middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})


// use routes from routes.js
app.use('/api/reviews', routes)


// connect to mongoDB
mongoose.connect(process.env.MONGODB_URI).then(() => {
    const PORT = process.env.PORT
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`)
    })
    console.log('Connected to MongoDB!')
}).catch((error) => {
    console.log(error)
})


