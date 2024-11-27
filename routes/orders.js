const router = require('express').Router();
const fs = require('fs');

const asyncHandler = require('../middleware/asyncHandler');
const ordersFilePath = '../data/orders.json';

router.get('/', asyncHandler(getAllOrders));
router.post('/create', asyncHandler(createOrder));
router.get('/bill/:orderId', asyncHandler(getBill));


async function getAllOrders(req, res) {
  const orders = require(ordersFilePath);
  res.json(orders);
}

async function createOrder(req, res) {
  const orders = require(ordersFilePath);
  orders.push(req.body);
  fs.writeFileSync('./data/orders.json', JSON.stringify(orders, null, 4));
  res.json({
    message: "Order created",
    data: req.body
  });
}

async function getBill(req, res) {
    const orderId = req.params.orderId;

    if (orderId == null) throw Error('No order id specified.');

    const orders = require(ordersFilePath);
  
    const order = orders.find(order => order.table == orderId);
    if (order == null) throw Error(`Could not find the order with id ${orderId}.`);

    const ticket = [];
    let total = 0;
    order.orders.forEach(plateId => {
        const plates = require('../data/menu.json');
        const plate = plates[plateId];
        if (plate != null) {
            ticket.push(`${plate.name} ${plate.price}`);
            total += Number(plate.price);
        }
    });
  
  
    res.send(ticket.join('\n').concat('\n-------------\n'.concat(`Total: ${total}`)))
}




module.exports = router;
