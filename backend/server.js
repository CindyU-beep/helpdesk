const express = require('express');
const { errorHandler } = require('./middleware/errorMiddleware');
const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 8000

const app = express()

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Home
app.get('/', (req, res) => {
    res.status(200).json({message: "Welcome to the Helpdesk" })
})

//Routes
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server is started running on port ${PORT}`))