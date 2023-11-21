const express = require("express");
const router = express.Router();
const orders = require("../data/orders.json");
const plates = require("../data/menu.json");
const fs = require("fs");

//Dentro de routes/orders.js necesitarás crear un CR para gestionar las órdenes.
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
  console.log(req.params.table); //1
  console.log(orders); //[ { table: '1', orders: [ '1', '5', '3' ] } ]
  console.log(orders.map((tableObj) => tableObj.orders)); //[ [ '1', '5', '3' ] ]
  console.log(orders.map((tableObj) => tableObj.orders).flat()); //[ '1', '5', '3' ]
  let testArray = orders.map((tableObj) => tableObj.orders).flat();
  console.log(testArray); //[ '1', '5', '3' ]
  let totalArray = [];
  testArray.forEach((orderItem) => {
    plates.forEach((foodItem) => {
      if (orderItem === foodItem.id) {
        console.log(foodItem.name, foodItem.price);
        totalArray.push(foodItem.price);
      }
    });
  });
  console.log(totalArray); //[ 10, 15.99, 15 ]
  let totalAmount = totalArray.reduce((acc, curr) => acc + curr, 0);
  console.log("Total " + totalAmount); //Total 40.99
  res.send("Testing");
});

module.exports = router;
