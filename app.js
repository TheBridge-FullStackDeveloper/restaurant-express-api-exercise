const express = require("express");
const app = express();
const PORT = 3000;
const router = require("./routes");

// Módulo Morgan:
const morgan = require("morgan");
app.use(morgan('dev'));

app.use(express.json()); // <-- Move this line above your route handling middleware
//The order is important!!!!

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT} 🚀`);
});
