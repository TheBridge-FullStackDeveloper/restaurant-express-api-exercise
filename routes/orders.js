const orders = "../data/orders.json"
const express = require('express');
const router = express.Router();
const fs = require ("fs");

router.get("/", (req, res) =>{
    res.json(orders);
});
rouger.post("/", (req,res) => {
    const newOrder = req.body;
    const info = [...orders, newOrder]
    fs.writeFile(".data/orders.json", JSON.stringify(info), (err) =>{
        if (err) throw err;
        res.json({message: "Order Created", data: newOrder});
    });
});

module.exports = router