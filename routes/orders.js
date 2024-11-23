const express = require("express");
const router = express.Router();

// Example route for `orders`
router.get("/", (req, res) => {
  res.json({ message: "Orders route is working!" });
});

module.exports = router; // Ensure this exports the router