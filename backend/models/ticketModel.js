const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    product: {
        type: String,
        required: [true, "Please select a product"],
        enum: ["Phone", "Laptop", "Tablet", "Accessories"]
    },
    description: {
        type: String,
        required: [true, "Please enter a description of the issue"]
    },
    status: {
        type: String,
        enum: ["new", "pending", "closed", "dismissed"],
        default: "new"
    }
},
    {
        timestamps: true
    }
)
module.exports = mongoose.model('Ticket', ticketSchema)