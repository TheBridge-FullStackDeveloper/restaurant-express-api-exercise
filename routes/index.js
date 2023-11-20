const express = require('express');
const router = express.Router();

const platesRoutes = require('./plates');
router.use('/plates', platesRoutes);

module.exports = router;