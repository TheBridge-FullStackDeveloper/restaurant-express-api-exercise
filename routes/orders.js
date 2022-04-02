const express = require("express");
const { writeFile } = require("fs");
const router = express.Router();
module.exports = router;

const orders = require('../data/orders.json');
const menu = require('../data/menu.json');
const { nextTick } = require("process");

//GET
router.get('/', (req, res) => {
    res.status(200).json(orders)
});

//POST
router.post('/create', (req, res) => {
    const newOrder = req.body
    const updatedOrders = [...orders, newOrder]
    writeFile('./data/orders.json', JSON.stringify(updatedOrders), () => {
        res.json({
            message: "Order Created",
            data: updatedOrders
        });
    });
});

//GET BILL
router.get('/bill/:table', (req, res) => {
    const [ {orders: currOrder} ] = orders.filter(bill => Number(bill.table) === Number(req.params.table))

    const name = currOrder.map(currPlateId => menu.filter(plate => plate.id === currPlateId)).map(plate => plate[0].name)
    const price = currOrder.map(currPlateId => menu.filter(plate => plate.id === currPlateId)).map(plate => plate[0].price)
    
    const bill = []

    for (let i = 0; i < name.length; i++) {
        bill.push(`${name[i]}: ${price[i]}`)
    };
    res.json([...bill, `total: ${price.reduce((e,a) => e+a)}`])
});

