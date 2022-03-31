const express = require("express");
const { writeFile } = require("fs");
const router = express.Router();
module.exports = router;

const orders = require('../data/orders.json');

//GET
router.get('/', (req, res) => {
    res.status(200).json(orders)
});

//POST
router.post('/create', (req, res) => {
    const newOrder = {
        "table": "1",
        "orders": ["1", "5", "3"]
    }
    const updatedOrders = [...orders, newOrder]
    writeFile('./data/orders.json', JSON.stringify(updatedOrders), () => {
        res.json({
            message: "Order Created",
            data: updatedOrders
        });
    });
});