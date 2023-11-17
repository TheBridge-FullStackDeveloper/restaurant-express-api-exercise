
const express = require("express");
const router = express.Router();
const allPlates = require ('../data/menu.json');

router.get('/', (req, res) => {
  res.send(allPlates);
});

/*router.post('/', (req, res) => {
  res.send('Drink created');
});

router.put('/:id', (req, res) => {
  res.send(`Drink with id ${req.params.id} updated`);
});

router.delete('/:id', (req, res) => {
  res.send(`Drink with id ${req.params.id} deleted`);
});*/

module.exports = router;