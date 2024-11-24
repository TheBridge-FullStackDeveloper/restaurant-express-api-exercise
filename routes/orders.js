const express = require("express");
const router = express.Router();
const fileSystem = require("fs");

// Example route for `orders`  modifidd from gitbook in plates get
router.get("/", (req, res) => {
    fileSystem.readFile("./data/orders.json", "utf8", (error, data) => {
      if (error) {
        return res.status(500).send("Failed to read orders.");
      }
        try {
        const orders = JSON.parse(data); // Parse the JSON data
        res.json(orders); // Respond with the parsed orders
      } catch {
        res.status(500).send("Invalid JSON format in orders file. Something is wrong.");
      }
    });
});

// this will help me do a POST for new order
router.post("/create", (req, res) => {
    fileSystem.readFile("./data/orders.json", "utf8", (error, data) => {
      if (error) return res.status(500).send("Failed to read orders.");
  
      const orders = JSON.parse(data); // Parse existing orders
      const newOrder = req.body; // Get new order from request body
  
      // Validate the new order
      if (!newOrder.table || !Array.isArray(newOrder.orders)) {
        return res.status(400).send("Invalid order format. Ensure 'table' and 'orders' are provided.");
      }
  
      orders.push(newOrder); // Add new order
  
      fileSystem.writeFile("./data/orders.json", JSON.stringify(orders, null, 2), (error) => {
        if (error) return res.status(500).send("Failed to save the new order.");
        res.status(201).json({ message: "Order Created", data: newOrder }); // Respond with the new order
      });
    });
  });

module.exports = router; // Ensure this exports the router



