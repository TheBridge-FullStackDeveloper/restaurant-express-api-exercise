const express = require("express");
const router = express.Router();
const fs = require("fs");

module.exports = router;

const menu = require("../data/menu.json");

router.get("", (req, res) => {
  res.send(menu);
});

router.post("", (req, res) => {
  const newPlate = {
    name: "Pasta al Pomodoro",
    description: "Tipical italian pasta",
    price: "10.99",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Pasta_al_pomodoro.JPG/220px-Pasta_al_pomodoro.JPG",
  };

  const newMenu = [...menu, newPlate];
  const plateData = JSON.stringify(newMenu);

  fs.writeFile("./data/menu.json", plateData, (err) => {
    if (err) throw err;
  });
  res.json({
    message: "Plate Created",
    data: newMenu,
  });
});

router.put("", (req, res) => {
  const updatedMenu = menu.map((e) => {
    if (e.name === "Salad") {
      return { ...e, name: "Cesar Salad" };
    }
    return e;
  });

  const updatedMenuData = JSON.stringify(updatedMenu);

  fs.writeFile("./data/menu.json", updatedMenuData, (err) => {
    if (err) throw err;
  });
  res.json({
    message: "Plate Updated",
    data: updatedMenu,
  });
});

router.delete("", (req, res) => {
  res.send("Recurso eliminado exitosamente");
});
