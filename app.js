const express = require("express");
const app = express();
const PORT = 3000;
const plates = require("./routes/plates.js")
const orders = require("./routes/orders.js")

app.use(express.json());

app.use("/plates", plates)

app.use("/orders", orders)

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT} 🚀`)
});
