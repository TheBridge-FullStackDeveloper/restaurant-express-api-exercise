const express = require('express');
const router = express.Router();

const platesRoutes = require('./plates'); 
const ordersRoutes = require('./orders'); 

router.use('/plates', platesRoutes);
router.use('/orders', ordersRoutes);

module.exports = router;