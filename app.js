const express = require("express");
const app = express();
const PORT = 3000;
const platesRef = require("./routes/plates.js");
const ordersRef = require("./routes/orders.js")

app.use(express.json());
app.use("/plates", platesRef);
app.use("/orders", ordersRef);

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT} 🚀`);
});
