const express = require('express');
const colors = require('colors');
const path = require('path')

const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const PORT = process.env.PORT || 8000

//Connect to MongoDB Database
connectDB()

const app = express()
//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))
app.use(errorHandler)

//Serve Frontend
if (process.env.NODE_ENV === 'production') {
    //setup build folder as static
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html'))
} else {
    //Home
    app.get('/', (req, res) => {
        res.status(200).json({ message: "Welcome to the Helpdesk" })
    })
}

app.listen(PORT, () => console.log(`Server is started running on port ${PORT}`))