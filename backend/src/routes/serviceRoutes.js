const express = require('express');
const router = express.Router();
const { getAllServices, getServiceById, scheduleService, cancelSchedule, getScheduledServices } = require('../controllers/serviceController');
const { protect } = require('../middleware/authMiddleware');

// Rotas públicas
router.get('/', getAllServices);
router.get('/:id', getServiceById);

// Rotas protegidas
router.get('/user/scheduled', protect, getScheduledServices);
router.post('/:id/schedule', protect, scheduleService);
router.post('/:id/cancel', protect, cancelSchedule);

module.exports = router; 