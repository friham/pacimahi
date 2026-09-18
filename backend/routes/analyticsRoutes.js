const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

router.post('/track', analyticsController.trackVisit);
router.post('/heartbeat', analyticsController.heartbeat);
router.get('/stats', analyticsController.getStats);

module.exports = router;
