const express = require("express");
const app = express();
const PORT = 3000;
const router = require("./routes");
const morgan = require("morgan");

app.use(morgan("dev"));
app.use(express.json());
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT} 🚀`);
});
