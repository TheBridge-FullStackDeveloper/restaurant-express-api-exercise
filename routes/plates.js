const express = require("express");
const router = express.Router();
const fs = require("fs");
const menu = require("../data/menu.json");

router.get("/", (req, res) => {
  res.status(200).json(menu);
});

router.post("/", (req, res) => {
  const newPlate = req.body;

  const data = JSON.stringify([...menu, newPlate], null, 4);

  fs.writeFile("./data/menu.json", data, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    res.status(200).json({ message: "added correctly" });
  });
});

router.put("/:id", (req, res) => {
  const plateId = req.params.id;

  const newMenu = menu.map((el) => {
    if (el.id === plateId) return { ...el, ...req.body };

    return el;
  });

  const data = JSON.stringify(newMenu, null, 4);

  fs.writeFile("./data/menu.json", data, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    res
      .status(200)
      .json({ message: "updated correctly", data: JSON.parse(data) });
  });
});

router.delete("/:id", (req, res) => {
  const plateId = req.params.id;

  const newMenu = menu.filter((plate) => plate.id !== plateId);

  const data = JSON.stringify(newMenu, null, 4);

  fs.writeFile("./data/menu.json", data, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    res
      .status(200)
      .json({ message: "removed correctly", data: JSON.parse(data) });
  });
});

module.exports = router;
