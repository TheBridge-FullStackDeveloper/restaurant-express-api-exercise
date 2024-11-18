const express = require("express");
const router = express.Router();
const fs = require("fs");
const orders = require("../data/orders.json");
const menu = require("../data/menu.json");

// Define a GET route to retrieve all orders
router.get("/", (req, res) => {
    res.status(200).json(orders);
});

// Define a POST route to create a new order
router.post("/", (req, res) => {
  const newOrders = req.body.orders;
  const newOrder = menu.filter((plate) => newOrders.includes(plate.id));
  const data = JSON.stringify([...orders, { tableId: req.body.table, orders: newOrder }], null, 4);
  fs.writeFile("./data/orders.json", data, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    res.status(200).json({ message: "added correctly", data: JSON.parse(data) });
  });
});

// Define a GET route to generate a bill for a specific table
router.get("/bill/:tableId", (req, res) => {
  const tableId = req.params.tableId;

  const [order] = orders.filter((el) => el.tableId === tableId);
  const platesOrdered = order.orders.reduce(
    (acc, order) => acc += `${order.name} ${order.price} \n`, ""
  );

  const total = order.orders.reduce((acc, el) => (acc += el.price), 0);

  const totalString = `Total ${JSON.stringify(total, null, 4)}`;

  fs.writeFile(`./data/bill-${tableId}.txt`, platesOrdered + totalString, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    res
      .status(200)
      .json({ message: "created correctly" });
  });
});

module.exports = router;