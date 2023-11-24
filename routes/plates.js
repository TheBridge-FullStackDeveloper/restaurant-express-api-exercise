
const plates =  require("../data/menu.json")
const express = require('express');
const fs = require ("fs");
const { stringify } = require("querystring");
const router = express.Router();

router.get('/', (req, res) => {
    res.json(plates);
  });
  router.post('/', (req, res) => {
    // Lógica para crear un recurso
 const plateNew= req.body;
 const info = [...plates, plateNew];
 fs.writeFile("./data/menu.json", JSON.stringify(info),(err) => {
  if (err) throw err;
  res.json ({message: "Plate Created", data: plateNew})
 })
  });

  router.put('/:id', (req, res) => {
    // Lógica para actualizar un recurso
    const plateUpdate = plates.map((el) => {
      if (el.id === req.params.id){
        return {
          ...el,
          name: req.body.name
      }
    }
      return el;
      
    });
    fs.writeFile("./data/menu.json", JSON.stringify(plateUpdate), (err) => {
      if (err) throw err;
      res.json({message: "Plate Updated", data: req.body.name})
    })
  });

  router.delete('/api/borrar', (req, res) => {
    // Lógica para eliminar un recurso
    const plateDelete = plates.filter((el) => {
      if (el.id === req.params.id){
        return false;
        } else{
          return true
      }
    });
    fs.writeFile("./data/menu.json", JSON.stringify(plateDelete),(err) => {
      if (err) throw err;
      res.json({message: "Plate removed", data: plates[1]});
    });
    
  });
  
  module.exports = router