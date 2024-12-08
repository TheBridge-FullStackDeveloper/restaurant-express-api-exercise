const express = require("express")
const router = express.Router()
const fs = require("fs");

let menu = []

fs.readFile("./data/menu.json", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  try {
    menu = JSON.parse(data)
    console.log(menu)
  } catch (error) {
    console.error(error)
  }
});

router.get("/", (req, res) => {
  res.json(menu);
});

router.post("/", (req, res) => {
  const newPlate= req.body
  menu.push(newPlate)
  res.json({
    message: "Plate Created",
    data: newPlate
  })
});

router.put("/:id", (req, res) => {
  const plateId = req.params.id
  const plateIndex = menu.findIndex((plate) => plate.id == plateId)
  /* console.log(plateIndex); */
  if(plateIndex === -1) {
    return res.status(404).send("Plate not found")}

  const {name} = req.body
  if(!name){
    return res.status(404).send(
      "Invalid request body. 'name' is required and cannot be empty.",
    );
  }
  menu[plateIndex] = {...menu[plateIndex], name}
  res.json({
    message: "Plate Updated",
    data: menu[plateIndex],
  });
  /* console.log(menu) */
});

router.delete("/:id", (req, res) => {
  const plateId = req.params.id;
  const plateIndex = menu.findIndex((plate) => plate.id === plateId)
  const deletedPlate = menu.splice(plateIndex, 1)
  res.json({
    message: "Plate Removed",
    data: deletedPlate,
  });
});

module.exports = router;