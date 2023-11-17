const express = require("express");
const app = express();
const PORT = 3000;
const allPlates = require ('./data/menu.json');

//const ordersRoute = require ('./routes/orders.js');
const platesRoute = require ('./routes/plates.js');

app.use(express.json());
app.use('/plates', platesRoute);
//app.use('/orders', ordersRoute);

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT} 🚀`)
});
