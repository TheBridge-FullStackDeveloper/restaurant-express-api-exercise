const express = require("express");
const app = express();
const PORT = 3000;

const plateRoute = require('./routes/plates');
const ordersRoute = require('./routes/orders');

app.use(express.json());

app.use('/plates', plateRoute)
app.use('/order', ordersRoute)


app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT} 🚀`)
});