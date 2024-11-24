const express = require('express');
const { setAvailability, getAvailability } = require('../controllers/availabilityController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/set', authMiddleware, setAvailability);
router.get('/:professorId', authMiddleware, getAvailability);

module.exports = router;
