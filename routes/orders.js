const express = require("express");
const router = express.Router();
const orders = require("../data/orders.json");
const plates = require("../data/menu.json");
const fs = require("fs");

//La primera ruta debería ser un GET para recuperar todas las órdenes de ./data/orders.json
router.get("/", (req, res) => {
  res.send(orders);
});

//La segunda ruta debería ser un POST para insertar una orden en ./data/menu.json y devolver un JSON como este { message: "Order Created", data: AQUÍ DEBERÍAN IR LOS DATOS GUARDADOS }
router.post("/create", (req, res) => {
  const createdOrder = { message: "Order Created", data: req.body };
  const orderNewArray = [...orders, req.body];
  fs.writeFile("./data/orders.json", JSON.stringify(orderNewArray), (err) => {
    if (err) throw err;
    console.log("Data written to file");
    res.json(createdOrder);
  });
});

//Bonus 🎁 Dentro de /routes/orders.js crea una ruta para obtener la cuenta de la mesa
router.get("/bill/:table", (req, res) => {
  let orderArray = orders.map((tableObj) => tableObj.orders).flat();
  let totalArray = [];
  let secondArray = [];
  orderArray.forEach((orderItem) => {
    plates.forEach((foodItem) => {
      if (orderItem === foodItem.id) {
        totalArray.push(foodItem.price);
        secondArray.push(`${foodItem.name} ${foodItem.price}`);
      }
    });
  });
  let totalAmount = totalArray.reduce((acc, curr) => acc + curr, 0);
  res.send(`${secondArray}\n------------\nTotal: ${totalAmount}`);
});

module.exports = router;
