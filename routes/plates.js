const express = require("express");
const router = express.Router();
const fs = require("fs"); //fs = file system

const menu = require("../data/menu.json");

router.get("", (req, res) => {
  res.send(menu);
  res.send("Data retrieved");
});

router.post("", (req, res) => {
  const newMenu = [...menu, req.body];

  fs.writeFile("./data/menu.json", JSON.stringify(newMenu), (err) => {
    if (err) throw err;
    res.send("Plate Created");
  });
});

router.put("/:id", (req, res) => {
  const updatedMenu = menu.map((el) =>
    el.id === req.params.id
      ? {
          ...el,
          name: req.body.name,
        }
      : el
  );

  fs.writeFile("./data/menu.json", JSON.stringify(updatedMenu), (err) => {
    if (err) throw err;
    res.send("Plate Updated");
  });
});

router.delete("/:id", (req, res) => {
  const newMenu = menu.filter(el => el.id !== req.params.id);

  fs.writeFile("./data/menu.json", JSON.stringify(newMenu), (err, data) => {
    if (err) throw err;
    res.send('Plate removed');
  });
});
module.exports = router;
