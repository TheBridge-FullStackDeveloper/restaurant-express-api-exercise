const router = require('express').Router();
const fs = require('fs');

const asyncHandler = require('../middleware/asyncHandler');
const menuFilePath = '../data/menu.json';

router.get('/', asyncHandler(getCompleteMenu));
router.post('/', asyncHandler(addPlate));
// la he hecho un poco distinto pero me parecia mas conveniente que coja el nombre del objeto
// directamente, lo busque y si existe lo actualice.
router.put('/', asyncHandler(updatePlate));
router.delete('/:id', asyncHandler(deletePlateById));


async function getCompleteMenu(req, res) {
  const menu = require(menuFilePath);
  res.json(menu);
}

// no se si es suficiente con hacer lo de writeFileSync para asegurarse de que el archivo se guarde,
// o habra problemas de concurrencia si se intenta leer de otro lado.
async function addPlate(req, res) {
  const menu = require(menuFilePath);
  menu.push(req.body);
  // por lo que sea aqui hay que poner un . menos para acceder a esta ruta?
  fs.writeFileSync('./data/menu.json', JSON.stringify(menu, null, 4));
  res.json(menu);
}

async function updatePlate(req, res) {
  const plateToUpdate = req.body.name;
  if (plateToUpdate == null) throw Error('No name to update specified.');
  
  const menu = require(menuFilePath);
  const plateIndex = menu.findIndex(plate => plate.name === plateToUpdate);
  if (plateIndex == -1) throw Error(`Could not find the plate with name ${plateToUpdate}.`);

  const oldPlate = menu[plateIndex];
  const newPlate = req.body;

  const updatedPlate = Object.assign(oldPlate, newPlate);
  menu[plateIndex] = updatedPlate;

  fs.writeFileSync('./data/menu.json', JSON.stringify(menu, null, 4));

  res.json({
    message: "Plate updated",
    data: updatedPlate
  })
}

async function deletePlateById(req, res) {
  const indexToRemove = req.params.id;
  const menu = require(menuFilePath);

  if (isNaN(indexToRemove)) throw Error(`The index '${indexToRemove}' is not a valid number.`);
  if (indexToRemove < 0 || indexToRemove >= menu.length) throw Error(`The index '${indexToRemove}' is outside of the menu array.`);
  
  const removedPlate = menu.splice(indexToRemove, 1)[0];
  fs.writeFileSync('./data/menu.json', JSON.stringify(menu, null, 4));

  res.json({
    message: "Plate removed",
    data: removedPlate
  })
}

module.exports = router;
