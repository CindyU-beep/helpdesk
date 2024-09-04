const { getNotes, createNotes } = require('../controllers/noteController')
const express = require('express')
const router = express.Router({ mergeParams: true })

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getNotes)
router.route('/').post(protect, createNotes)

module.exports = router
