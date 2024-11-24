const express = require('express');
const { bookAppointment, cancelAppointment, getAppointments } = require('../controllers/appointmentController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/book', authMiddleware, bookAppointment);
router.delete('/cancel/:id', authMiddleware, cancelAppointment);
router.get('/my', authMiddleware, getAppointments);

module.exports = router;
