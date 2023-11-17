
const plates =  require("../data/menu.json")
const express = require('express');
const app = express();
const router = express.Router();

router.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
  });
  router.post('/', (req, res) => {
    // Lógica para crear un recurso
    res.send('Recurso creado exitosamente');
  });

  router.put('/api/actualizar', (req, res) => {
    // Lógica para actualizar un recurso
    res.send('Recurso actualizado exitosamente');
  });

  router.delete('/api/borrar', (req, res) => {
    // Lógica para eliminar un recurso
    res.send('Recurso eliminado exitosamente');
  });
  
  module.exports = router