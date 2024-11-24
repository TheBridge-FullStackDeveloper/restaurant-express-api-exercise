const express = require("express");
const app = express();
const PORT = 3000;

const orders = require("./routes/orders.js");
const plates = require("./routes/plates.js");


app.use(express.json());
app.use("/orders", orders);
app.use("/plates", plates);


//for fun
app.get("/", (req, res) => {
  res.send("This confirms the server is working!  '../plates' will show me the menu and  '../orders' will hopefully show me orders");
});
//

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT} 🚀`)
});
