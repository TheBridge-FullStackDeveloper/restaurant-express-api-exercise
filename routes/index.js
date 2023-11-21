const express = require("express");
const router = express.Router();

const platesRoutes = require("./plates");
router.use("/plates", platesRoutes);

const orderRoutes = require("./orders");
router.use("/orders", orderRoutes);

module.exports = router;
