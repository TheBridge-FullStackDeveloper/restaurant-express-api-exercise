const express = require("express");
const router = express.Router();
const plates = require("../data/menu.json");
const fs = require("fs"); // Import the fs module

//./data/menu.json looks for the file in the data directory within the current directory.
//../data/menu.json looks for the file in the data directory within the parent directory.

//La primera ruta debería ser un GET para recuperar todos los platos de ./data/menu.json
router.get("/plates", (req, res) => {
  res.send(plates);
});

//La segunda ruta debería ser un POST para insertar un plato en ./data/menu.json y devolver un JSON como este { message: "Plate Created", data: AQUÍ DEBERÍAN IR LOS DATOS GUARDADOS }
router.post("/plates", (req, res) => {
  const newFoodObj = [...plates, req.body];

  fs.writeFile("./data/menu.json", JSON.stringify(newFoodObj), (err) => {
    if (err) throw err;
    res.send({ message: "Plate Removed", data: req.body });
  });
});

//La tercera ruta debería ser un PUT para cambiar una propiedad de un plato y devolver un JSON como este { message: "Plate Updated", data: AQUÍ DEBERÍAN IR LOS DATOS GUARDADOS }

//La cuarta ruta debería ser un DELETE para eliminar un plato del menú y devolver un JSON como este { message: "Plate Removed", data: AQUÍ DEBERÍAN IR LOS DATOS GUARDADOS }

module.exports = router;
