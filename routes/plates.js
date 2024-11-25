const express = require("express");
const fs = require("fs");
const router = express.Router();

router.get("/", (req, res) => {
  fs.readFile("./data/menu.json", "utf8", (err, data) => {
    if (err) {
      console.error("Ocurrió un error al leer el archivo:", err);
      return;
    }

    try {
      const menu = JSON.parse(data);
      res.send(menu);
    } catch (error) {
      console.error("Error al parsear los datos:", error);
    }
  });
});

router.post("/", (req, res) => {
  let plates = [];

  fs.readFile("./data/menu.json", "utf8", (err, data) => {
    if (err) {
      console.error("Ocurrió un error al leer el archivo:", err);
      return;
    }

    try {
      const objeto = JSON.parse(data);
      const newPlate = req.body;
      plates = [...objeto, newPlate];

      let platesStringify = JSON.stringify(plates, null, 2);

      fs.writeFile("./data/menu.json", platesStringify, (err) => {
        if (err) throw err;
        console.log("Data written to file");
      });

      res.send("Plate Created");
    } catch (error) {
      console.error("Error al parsear los datos:", error);
    }
  });
});


router.put("/:id", (req, res) => {
  

    fs.readFile("./data/menu.json", "utf-8", (err, data) => {
        if (err) {
            console.error("Ocurrió un error al leer el archivo:", err);
            return;
          }

          try {
            const menu = JSON.parse(data);
            const idPlato = req.params.id;
            const nuevoMenu = menu.map((el) => {
                if (el.id === idPlato) return { ...el, ...req.body };
                return el;
            });
            let dataStringify = JSON.stringify(nuevoMenu, null, 4);

            fs.writeFile("./data/menu.json", dataStringify, (err) => {
                if (err) throw new err
                console.log("Data written to file");
            });
            res.send({ message: "Plate Updated", data: nuevoMenu });


          } catch (error) {
            console.error("Error al parsear los datos:", error);
          };
    });

});

router.delete("/:id", (req, res) => {
    
    fs.readFile("./data/menu.json", "utf-8", (err, data) => {
        if (err) {
            console.error("Ocurrió un error al leer el archivo:", err);
            return;
          };

        try {
            const menu = JSON.parse(data);
            const idPlato = req.params.id;

            const index = menu.findIndex((el) => el.id === idPlato);

            if (index === -1) {
                return res.status(404).send({ message: "Plato no encontrado" });
            };

            menu.splice(index, 1);

            const dataStringify = JSON.stringify(menu, null, 2);

            fs.writeFile("./data/menu.json", dataStringify, (err) => {
                if(err) {
                    console.log("Data written to file");
                };
                res.send({ message: "Plate Removed", data: menu });
            })

        } 
        
        catch (error) {
            console.error("Error al parsear los datos:", error);
        };
    })
})


module.exports = router;
