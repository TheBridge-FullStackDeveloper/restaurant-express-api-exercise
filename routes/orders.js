const express = require("express");
const router = express.Router();
const fs = require("fs");

const orders = require("../data/orders.json");

router.get("/", (req, res) => {
  res.send(orders);
});

router.post("/", (req, res) => {
  const newOrder = [...orders, req.body];
  const newData = {
    message: "Order Created",
    data: req.body,
  };
  fs.writeFile("./data/orders.json", JSON.stringify(newOrder), (err) => {
    if (err) throw err;
    res.send(newData);
  });
});

module.exports = router;
