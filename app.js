const express = require("express");
const app = express();
const PORT = 3000;
const routerPl = require("./routes/plates") //importamos las rutas
const routerOr = require("./routes/orders");

app.use(express.json());

app.use("/plates", routerPl)
app.use("/orders", routerOr)

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT} 🚀`)
});
