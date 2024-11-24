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

// for fun... get plate by ID #
router.get("/:id", (req, res) => {
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
        const plateID = objeto.find(item => item.id === req.params.id);
            if (!plateID){
                return res.status(404).send("Plate not found. Try another number.")
            }
            console.log(plateID); // Ahora `objeto` es un objeto JavaScript/// this is the item in the hson
            res.json(plateID);
      } catch (error) {
        console.error("Error when parsing data:", error);
        res.status(500).send("Invalid JSON format."); // Send plain text error
      }
    });
  });

//Part 2 -this will allow me to  POST to add the new plate using the POSTMAN app window..see screenshot
router.post("/", (req, res) => {
  try {
    fileSystem.readFile("./data/menu.json", "utf8", (error, data) => {
      if (error) throw new Error(error);
      let dataItems = JSON.parse(data);

      //i accidently ran the POST twice...made a duplicate...so here is code to prevent that
      const isDuplicate = dataItems.some((dish) => dish.name === req.body.name);
      if (isDuplicate) {
        return res
          .status(400)
          .json({ error: "Dish with this name already exists." });
      }
      let response = [...dataItems, req.body];
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

//Part 3 - change a name of a plate

router.put("/:id", (req, res) => {
    fileSystem.readFile("./data/menu.json", "utf8", (error, data) => {
      if (error) {
        console.error("An error occurred while reading the file:", error);
        return;
      }
  
      const menu = JSON.parse(data);
      const plateID = menu.find(item => item.id === req.params.id); // Find plate by ID
  
      if (!plateID) return res.status(404).send("Plate not found.");
  
      Object.assign(plateID, req.body); // Update plate with new data
  
      fileSystem.writeFile("./data/menu.json", JSON.stringify(menu, null, 2), (error) => {
        if (error) return res.status(500).send("Failed to update menu data.Try again.");
        res.json({ message: "Plate Updated", data: plateID });
      });
    });
  });
  

  // Part 4 - delete an item in the menu --plate 2
  router.delete("/:id", (req, res) => {
    fileSystem.readFile("./data/menu.json", "utf8", (error, data) => {
      if (error) {
        console.error("An error occurred while reading the file:", error);
        return;
      }
  
      const menu = JSON.parse(data);
      const plateIndex = menu.findIndex(item => item.id === req.params.id); // Find plate by ID
      if (plateIndex === -1) {
      return res.status(404).send("Plate not found.");
      }
  
      const removedPlate = menu.splice(plateIndex, 1)[0];  //removes plate 2 from array 1= 2nd plate, 1,
      // 1 means remove 1 item starting at 1
  
      fileSystem.writeFile("./data/menu.json", JSON.stringify(menu, null, 2), (error) => {
        if (error) return res.status(500).send("Failed to remove menu data.Try again.");
        res.json({ message: "Plate Removed", data: removedPlate });
      });
    });
  });


  //part 5 - CR to manage the orders -
  // The first route should be a GET to retrieve all the orders from./data/orders.json


module.exports = router;
