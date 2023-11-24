const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("", (req, res) => {
    res.send("Recurso creado exitosamente");
  });
  
  router.post("", (req, res) => {
    res.send("Recurso creado exitosamente");
  });
  
  router.put("", (req, res) => {
    res.send("Recurso actualizado exitosamente");
  });
  
  router.delete("", (req, res) => {
    res.send("Recurso eliminado exitosamente");
  });

module.exports = router;