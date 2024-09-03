const express = require('express')
const router = express.Router()
const { getTickets, getTicket, createTicket, deleteTicket, updateTicket } = require('../controllers/ticketController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getTickets).post(protect, createTicket)

router.route('/:id').get(protect, getTicket)
router.route('/:id').put(protect, updateTicket)
router.route('/:id').delete(protect, deleteTicket)

module.exports = router