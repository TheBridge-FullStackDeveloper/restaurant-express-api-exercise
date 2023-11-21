const express = require("express");
const router = express.Router();
const fs = require("fs"); //fs = file system

const orders = require("../data/orders.json");
const menu = require("../data/menu.json");

router.get("", (req, res) => {
  res.send(orders);
  res.send("Data retrieved");
});

router.post("/create", (req, res) => {
  const newOrder = [...orders, req.body];

  fs.writeFile("./data/orders.json", JSON.stringify(newOrder), (err) => {
    if (err) throw err;
    res.send("Order Created");
  });
});

router.get("/bill/:table", (req, res) => {
  const { table } = req.params;
  const ordersData = require("../data/orders.json");

  const ordersForTable = ordersData.filter((order) => order.table == table);

  if (ordersForTable.length > 0) {
    let total = 0;
    ordersForTable.forEach((order) => {
      order.orders.forEach((itemId) => {
        const plate = menu.find((item) => item.id == itemId);
        if (plate) {
          total += parseFloat(plate.price);
          res.write(`${plate.name} ${plate.price}\n`);
        }
      });
    });
    res.write("------------\n");
    res.end(`Total ${total.toFixed(2)}`);
  } else {
    res.send("No orders");
  }
});
module.exports = router;
