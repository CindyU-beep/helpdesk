const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')
const Note = require('../models/noteModel')

// @desc Get notes by ticket id
// @route GET /api/tickets/:ticketId/notes
// @access Private
const getNotes = asyncHandler(async (req, res) => {
    //get user from JWT id
    const user = await User.findById(req.user._id)

    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }
    const ticket = await Ticket.findById(req.params.ticketId)

    if (ticket.user.toString() !== req.user._id.toString()) {
        res.status(401)
        throw new Error('User Not Authorised to View This Ticket')
    }

    const notes = await Note.find({ ticket: req.params.ticketId })

    res.status(200).json(notes)
})


// @desc Get notes for ticket
// @route POST /api/tickets/:ticketId/notes
// @access Private
const createNotes = asyncHandler(async (req, res) => {
    //get user from JWT id
    const user = await User.findById(req.user._id)

    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }
    const ticket = await Ticket.findById(req.params.ticketId)

    if (ticket.user.toString() !== req.user._id.toString()) {
        res.status(401)
        throw new Error('User Not Authorised to View This Ticket')
    }

    const notes = await Note.create({
        text: req.body.text,
        isStaff: false,
        ticket: req.params.ticketId,
        user: req.user._id
    })

    res.status(200).json(notes)
})

module.exports = { getNotes, createNotes }