const express = require('express');
const router = express.Router()
module.exports = router

const menu = require('../data/menu.json')
const { writeFile } = require('fs')

//GET
router.get('/', (req, res) => {
    res.status(200).json(menu)
});


//POST
router.post('/', (req, res) => {
    const pastaPomodoro = {
        "name": "Pasta al Pomodoro",
        "description": "Tipical italian pasta",
        "price": "10.99",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Pasta_al_pomodoro.JPG/220px-Pasta_al_pomodoro.JPG"
    };

    const newMenu = [...menu, pastaPomodoro]

    writeFile('./data/menu.json',
    JSON.stringify(newMenu), (error, info) => {
        if (error) {
            console.error(error)
        } else {
            console.log(info)
        };
    });
    res.json({
        message: "Plate Created",
        data: newMenu
    });
});


//PUT
router.put('/6', (req, res) => {

    
    const newMenu = menu.map(plate => {
        if (plate.name === 'Salad') return {...plate, name: "Cesar Salad"}
        return plate
    });

    writeFile('./data/menu.json', JSON.stringify(newMenu), () => {
        res.json({
            message: "Plate Updated",
            data: newMenu
        });
    });
});


//DELETE
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const newMenu = menu.filter(plate => plate.id !== id)

    writeFile('./data/menu.json', JSON.stringify(newMenu), () => {
        res.json({
            message: "Plate Removed",
            data: newMenu
        });
    });
});