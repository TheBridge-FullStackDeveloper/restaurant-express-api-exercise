const express = require('express');
const router = express.Router();

const platesRouter = require('./plates'); 
const ordersRouter = require('./orders'); 

router.use('/plates', platesRouter);
router.use('/orders', ordersRouter);

module.exports = router;