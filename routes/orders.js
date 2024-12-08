const express = require("express");
const router = express.Router();
const fs = require("fs");
/* const plates = require("./plates");  */

router.post("/create", (req, res) => {
  fs.readFile("./data/orders.json", "utf8", (err, data) => {
    if (err) throw err;

    let orders = JSON.parse(data);

    const newOrder = req.body;

    let updatedOrders = { ...orders, ...newOrder };

    const updatedData = JSON.stringify(updatedOrders);

    fs.writeFile("./data/orders.json", updatedData, (err) => {
      if (err) throw err;

      res.json({
        message: "Order Created",
        data: newOrder,
      });
      console.log(newOrder);
    });
  });
});

module.exports = router;
