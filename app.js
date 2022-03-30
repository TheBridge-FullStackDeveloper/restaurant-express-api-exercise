const express = require("express");
const app = express();
const PORT = 3000;

const platesRoute = require("./routes/plates");
const ordersRoute = require("./routes/orders");

app.use(express.json());

app.use('/plates', platesRoute);
app.use('/orders', ordersRoute);

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT} 🚀`)
});
