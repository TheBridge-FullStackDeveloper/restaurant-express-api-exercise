const express = require("express");
const fileSystem = require("fs");
const router = express.Router();


router.get("/", (req, res) => {
   fileSystem.readFile("./data/menu.json", "utf8", (err, data) => {
    if (err) {
      console.error('Ocurrió un error al leer el archivo:', err);
      return;
    }
    // `data` es una cadena con el contenido del archivo
    try {
      const objeto = JSON.parse(data);
      console.log(objeto); // Ahora `objeto` es un objeto JavaScript
      res.json(objeto);
    } catch (error) {
      console.error('Error al parsear los datos:', error);
    }
  });
});

module.exports = router; 