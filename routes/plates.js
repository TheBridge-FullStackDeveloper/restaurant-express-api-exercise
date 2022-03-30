const express = require('express');
const router = express.Router()
module.exports = router

const menu = require('../data/menu.json')
const { writeFile } = require('fs')

router.get('/', (req, res) => {
    res.status(200).json(menu)
})

router.post('/', (req, res) => {
    const pastaPomodoro = {
       "name": "Pasta al Pomodoro",
       "description": "Tipical italian pasta",
       "price": "10.99",
       "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Pasta_al_pomodoro.JPG/220px-Pasta_al_pomodoro.JPG"
   }

   const newMenu = [...menu, pastaPomodoro]
   
   writeFile('./data/menu.json', JSON.stringify(newMenu), (error, info) => {
        if (error) {
        console.error(error)
    } else {

    }
})
    res.json({
        message: "Plate Created",
        data: newMenu
    })
})