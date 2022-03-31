const express = require('express');
const router = express.Router() ///express router
const fs = require('fs');

const plates = require('../data/menu.json')

router.get('/', (req,res)=>{
    res.json(plates)
});

router.post('/', (req,res)=>{
    const newPlate = req.body // lo que metemos en postman
    const newState = [...plates, newPlate] //traemos todos los datos del json de la linea 5 y agregamos el nuevo plato.
    fs.writeFile('./data/menu.json', JSON.stringify(newState), ()=>{
        res.json({ message: "Plate Created", data: newState })
    });
});

router.put('/:id', (req, res)=>{
    const plateId = req.params.id; //recojo el id de la url desde params
    const name = req.body.name;//recojo el name de lo que envio

    console.log(plateId)
    const newState = plates.map((plate) => {//recorremos todos los platos del menu
        if (plate.id === plateId) return { ...plate, name }; //si coincide cambiamos el nombre y dejamos todo tal cual está
        return plate;
      });
    fs.writeFile("./data/menu.json", JSON.stringify(newState), () => { //Sobreescribimos el archivo
    res.json({ message: "Plate Updated", data: newState });
    });
    
})

router.delete('/:id', (req,res)=>{
    const plateId = req.params.id; //recojo el id de la url desde params
    const newState = plates.filter((plate) => plate.id !== plateId); //si la condicion es verdadera vuelve a meter todos lo platos en el array mientras no coincid con el id.
    
    fs.writeFile("./data/menu.json", JSON.stringify(newState), () => { //Sobreescribimos el archivo
        res.json({ message: "Plate Removed", data: newState });
      });
})

module.exports = router