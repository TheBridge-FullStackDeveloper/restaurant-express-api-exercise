const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get("/", (req, res) => {
    fs.readFile("./data/orders.json", "utf8", (err, data) => {
      if (err) {
        console.error("Ocurrió un error al leer el archivo:", err);
        return;
      }
  
      try {
        const orders = JSON.parse(data);
        res.send(orders);
      } catch (error) {
        console.error("Error al parsear los datos:", error);
      }
    });
  });

router.post("/create", (req, res) => {

    fs.readFile("./data/orders.json", "utf8", (err, data) => {
      if (err) {
        console.error("Ocurrió un error al leer el archivo:", err);
        return res.status(500).json({ message: "Error al leer el archivo de menú." });
    };

      try {
        const menu = JSON.parse(data);
        const newOrder = req.body;

        menu.push(newOrder);
  
        const orderStringify = JSON.stringify(menu, null, 2);
  
        fs.writeFile("./data/orders.json", orderStringify, (err) => {
          if (err) throw err;
          console.log("Data written to file");
          
          console.log("Nueva orden guardada:", newOrder);
          res.send({ message: "Order Created", data: newOrder });
        });
  
      } catch (error) {
        console.error("Error al parsear los datos:", error);
      }
    });
  });

router.get("/bill/:id", (req, res) => {

    const tableId = req.params.id;

    fs.readFile("./data/orders.json", "utf-8", (err, ordersData) => {
        if(err) {
            console.error("Ocurrió un error al leer los archivos:", err);
            return res.status(500).send("Error al leer las órdenes");
        };

        fs.readFile("./data/menu.json", "utf8", (err, menuData) => {
            if (err) {
                console.error("Error al leer el archivo menu.json:", err);
                return res.status(500).send("Error al leer el menú");
            };

        try {
            orders = JSON.parse(ordersData);
            menu = JSON.parse(menuData);

            const tableOrder = orders.find(order => order.table === tableId);
                if (!tableOrder) {
                    return res.status(404).send(`No se encontraron órdenes para la mesa ${tableId}.`);
                };
            const billDetails = tableOrder.orders.map(orderId => {
                    const dish = menu.find(item => item.id === orderId);
                    return dish ? { name: dish.name, price: dish.price } : null;
                }).filter(Boolean);
            const total = billDetails.reduce((sum, item) => sum + item.price, 0);

            let billOutput = billDetails.map(item => `${item.name} ${item.price}`).join("\n");
                billOutput += `\n------\nTotal ${total.toFixed(2)}`;

            res.send(billOutput);
        } catch (error){
            console.error("Error al procesar los datos:", error);
            return res.status(500).send("Error al procesar los datos.");
        }

        
    })


})

});


  




module.exports = router;