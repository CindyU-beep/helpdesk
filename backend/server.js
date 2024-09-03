const express = require('express');
const colors = require('colors');
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

//Home
app.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome to the Helpdesk" })
})

//Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server is started running on port ${PORT}`))