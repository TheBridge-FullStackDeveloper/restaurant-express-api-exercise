const express = require("express");
const router = express.Router();
const allPlates = require("../data/menu.json");
const fs = require("fs");

router.get("/", (req, res) => {
  res.json(allPlates);
});

router.post("/", (req, res) => {
  const newPlate = req.body;
  const data = [...allPlates, newPlate];
  fs.writeFile("./data/menu.json", JSON.stringify(data), (err) => {
    if (err) throw err;
    res.json({ message: "Plate Created", data: newPlate });
  });
});

router.put("/:id", (req, res) => {
  const updatePlate = allPlates.map((el) => {
    if (el.id === req.params.id) {
      return {
        ...el,
        name: req.body.name,
      };
    }
    return el;
  });

  fs.writeFile("./data/menu.json", JSON.stringify(updatePlate), (err) => {
    if (err) throw err;
    res.json({ message: "Plate Updated", data: req.body.name });
  });
});

router.delete("/:id", (req, res) => {
  const deletePlate = allPlates.filter((el) => {
    if (el.id === req.params.id) {
      return false;
    }
    return true;
  });
  fs.writeFile("./data/menu.json", JSON.stringify(deletePlate), (err) => {
    if (err) throw err;
    res.json({ message: "Plate Removed", data: allPlates[1]});
  });
});

module.exports = router;
