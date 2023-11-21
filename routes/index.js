const express = require("express");
const router = express.Router();

const platesRoutes = require("./plates.js");
const orderRoutes = require("./orders.js");

router.use("/plates", platesRoutes);
router.use("/orders", orderRoutes);

module.exports = router;
