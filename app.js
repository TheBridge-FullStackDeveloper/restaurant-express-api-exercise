const express = require("express");
const app = express();
const PORT = 3000;

const indexRoute = require('./routes');

app.use(express.json());

app.use('/api', indexRoute);

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT} 🚀`)
});
