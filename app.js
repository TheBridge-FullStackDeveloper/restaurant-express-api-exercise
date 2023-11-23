const express = require("express");
const app = express();
const PORT = 3000;

const platesRoute = require ('./routes/plates.js');
const ordersRoute = require ('./routes/orders.js');

app.use(express.json());
app.use('/plates', platesRoute);
app.use('/orders', ordersRoute);

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT} 🚀`)
});
