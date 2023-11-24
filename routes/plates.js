const express = require("express");
const router = express.Router();
const plates = require("../data/menu.json");
const fs = require("fs");

//La primera ruta debería ser un GET para recuperar todos los platos de ./data/menu.json
router.get("/", (req, res) => {
  res.send(plates);
});

//La segunda ruta debería ser un POST para insertar un plato en ./data/menu.json y devolver un JSON como este { message: "Plate Created", data: AQUÍ DEBERÍAN IR LOS DATOS GUARDADOS }
router.post("/", (req, res) => {
  const createdData = {
    message: "Plate Created",
    data: req.body,
  };
  const newPlatesObj = [...plates, req.body];
  fs.writeFile("./data/menu.json", JSON.stringify(newPlatesObj), (err) => {
    if (err) throw err;
    console.log("Data written to file");
    res.json(createdData);
  });
});

//La tercera ruta debería ser un PUT para cambiar una propiedad de un plato y devolver un JSON como este { message: "Plate Updated", data: AQUÍ DEBERÍAN IR LOS DATOS GUARDADOS }

router.put("/:id", (req, res) => {
  const updatedData = { message: "Plate Updated", data: req.body };
  const updatedFood = plates.map((foodItem) => {
    if (foodItem.id === req.params.id) {
      foodItem.name = req.body.name;
    }
    return foodItem;
  });
  fs.writeFile("./data/menu.json", JSON.stringify(updatedFood), (err) => {
    if (err) throw err;
    console.log("Data written to file");
    res.json(updatedData);
  });
});

//La cuarta ruta debería ser un DELETE para eliminar un plato del menú y devolver un JSON como este { message: "Plate Removed", data: AQUÍ DEBERÍAN IR LOS DATOS GUARDADOS }
router.delete("/:id", (req, res) => {
  const deletedData = { message: "Plate Removed", data: plates[1] };
  const deletedFood = plates.filter(
    (foodItem) => foodItem.id !== req.params.id
  );
  fs.writeFile("./data/menu.json", JSON.stringify(deletedFood), (err) => {
    if (err) throw err;
    console.log("Data written to file");
    res.json(deletedData);
  });
});

module.exports = router;
