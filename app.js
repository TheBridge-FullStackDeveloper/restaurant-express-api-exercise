const express = require("express");
const app = express();
const PORT = 3000;
const indexRef = require("./routes");

app.use(express.json());
app.use("", indexRef);

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT} 🚀`);
});
