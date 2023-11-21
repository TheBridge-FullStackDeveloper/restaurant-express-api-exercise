const express = require("express");
const router = express.Router();
const fs = require("fs"); //fs = file system

const orders = require("../data/orders.json");

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

module.exports = router;
