const express = require("express");
const router = express.Router();
const fs = require("fs");

module.exports = router;

const menu = require("../data/menu.json");

router.get("/", (req, res) => {
  res.send(menu);
});

router.post("/", (req, res) => {
  const newPlate = [...menu, req.body];
  const newData = {
    message: "Plate Created",
    data: req.body,
  };

  fs.writeFile("./data/menu.json", JSON.stringify(newPlate), (err) => {
    if (err) throw err;
    res.send(newData);
  });
});

router.put("/:id", (req, res) => {
  const updatedMenu = menu.map((e) => {
    if (e.id === req.params.id) {
      return { ...e, name: req.body.name };
    }
    return e;
  });

  const newData = {
    message: "Plate Created",
    data: req.body.name,
  };

  fs.writeFile("./data/menu.json", JSON.stringify(updatedMenu), (err) => {
    if (err) throw err;
  });
  res.json(newData);
});

router.delete("/:id", (req, res) => {
  const deletePlate = menu.filter((e) => e.id !== req.params.id);
  const newData = {
    message: "Plate Removed",
    data: menu[1],
  };

  fs.writeFile("./data/menu.json", JSON.stringify(deletePlate), (err) => {
    if (err) throw err;
  });
  res.json(newData);
});
