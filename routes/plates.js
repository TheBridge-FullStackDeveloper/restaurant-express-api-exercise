const express = require("express");
const fileSystem = require("fs");
const router = express.Router();

// part 1-this compless and shows using...GET below shows all plates #1- #6 http://localhost:3000/plates
router.get("/", (req, res) => {
  //used from Read a JSON gitbook page but updated
  fileSystem.readFile("./data/menu.json", "utf8", (error, data) => {
    if (error) {
      console.error("An error occurred while reading the file:", error);
      return;
    }
    // `data` es una cadena con el contenido del archivo...  `data` is a string containing the contents/folder of the file .. that will be the json
    try {
      const objeto = JSON.parse(data);
      console.log(objeto); // Ahora `objeto` es un objeto JavaScript/// this is the item in the hson
      res.json(objeto);
    } catch (error) {
      console.error("Error when parsing data:", error);
    }
  });
});

//this will allow me to  POST to add the new plate using the POSTMAN app window..see screenshot
router.post("/", (req, res) => {
  try {
    fileSystem.readFile("./data/menu.json", "utf8", (error, data) => {
      if (error) throw new Error(error);
      let data = JSON.parse(data);

      //i accidently ran the POST twice...made a duplicate...so here is code to prevent that
      const isDuplicate = data.some((dish) => dish.name === req.body.name);
      if (isDuplicate) {
        return res
          .status(400)
          .json({ error: "Dish with this name already exists." });
      }
      let response = [...data, req.body];
      res.send({ Message: "Plate Created", "Data:": req.body });

      fileSystem.writeFile(
        "./data/menu.json",
        JSON.stringify(response, null, 2),
        (error) => {
          if (error) throw new Error(err);
        }
      );
    });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
