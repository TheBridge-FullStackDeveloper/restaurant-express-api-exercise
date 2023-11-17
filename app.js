const express = require("express");
const app = express();
const PORT = 3000;

const router = require("./routes/plates.js");// Importamos las rutas

app.use("/api", router); // Le decimos a express que use las rutas
// Todas las rutas definidas con `router` se prefijarán con `/api`
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT} 🚀`)
});
