//Imports and Setup
const express = require("express");
const router = express.Router();
const fs = require("fs");
const menu = require("../data/menu.json");
//Route: Get / (fetch all plates in the menu) and return a JSON response (200 OK)
router.get("/", (req, res) => {
    res.status(200).json(menu);
});
//Route: POST / (handle the creation of a new plate) and return a JSON response (200 OK)
router.post("/", (req, res) => {
    const newPlate = req.body;
    const data = JSON.stringify([...menu, newPlate], null, 4);
    fs.writeFile("./data/menu.json", data, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        res.status(200).json({ message: "Plate added successfully" });
    });
});
//Route: PUT /:id (update a plate by id) and return a JSON response (200 OK)
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
        res.status(200).json({ message: "Plate updated successfully", data: JSON.parse(data) });
    });
});
//Route: DELETE /:id
router.delete("/:id", (req, res) => {
    const plateId = req.params.id;
    const newMenu = menu.filter((plate) => plate.id !== plateId);
    const data = JSON.stringify(newMenu, null, 4);
    fs.writeFile("./data/menu.json", data, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        res.status(200).json({ message: "Plate delete successfully", data: JSON.parse(data)});
    });
});


