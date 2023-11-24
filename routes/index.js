const express = require("express");
const router = express.Router();

const platesRoute = require('./plates');
const ordersRoute = require('./orders');

router.use('/plates', platesRoute);
router.use('/orders', ordersRoute);

module.exports = router;