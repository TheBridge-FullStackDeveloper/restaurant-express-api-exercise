const express = require("express");
const app = express();
const PORT = 3000;

const orders = require("./routes/orders.js");
const plates = require("./routes/plates.js");


app.use(express.json());
app.use("/orders", orders);
app.use("/plates", plates);

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT} 🚀`)
});
