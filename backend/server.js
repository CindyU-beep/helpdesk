const express = require('express');
const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 8000

const app = express()

//Routes
app.get('/', (req, res) => {
    res.status(200).json({message: "Welcome to the Helpdesk" })
})

app.listen(PORT, () => console.log(`Server is started running on port ${PORT}`))