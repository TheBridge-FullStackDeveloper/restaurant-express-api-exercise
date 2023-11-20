const express = require("express");
const router = express.Router();
const plates = require("../data/menu.json");
const fs = require("fs"); // Import the fs module, it is already installed in Node

//./data/menu.json looks for the file in the data directory within the current directory.
//../data/menu.json looks for the file in the data directory within the parent directory.

//La primera ruta debería ser un GET para recuperar todos los platos de ./data/menu.json
router.get("/", (req, res) => {
  res.send(plates);
});

//La segunda ruta debería ser un POST para insertar un plato en ./data/menu.json y devolver un JSON como este { message: "Plate Created", data: AQUÍ DEBERÍAN IR LOS DATOS GUARDADOS }
router.post("/", (req, res) => {
  const completeData = {
    message: "Plate Created",
    data: req.body,
  };
  const newPlatesObj = [...plates, completeData];
  fs.writeFile("./data/test.json", JSON.stringify(newPlatesObj), (err) => {
    if (err) throw err;
    console.log("Data written to file");
    res.send("Data written to file");
  });
});

//La tercera ruta debería ser un PUT para cambiar una propiedad de un plato y devolver un JSON como este { message: "Plate Updated", data: AQUÍ DEBERÍAN IR LOS DATOS GUARDADOS }
router.put("/:id", (req, res) => {
  console.log(req.params.id);
  console.log(plates);
  res.send(plates);
});

//La cuarta ruta debería ser un DELETE para eliminar un plato del menú y devolver un JSON como este { message: "Plate Removed", data: AQUÍ DEBERÍAN IR LOS DATOS GUARDADOS }

module.exports = router;
