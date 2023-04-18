const express = require("express");
const routes = require("./routes/index");
const cors = require("cors");

const app = express();

app.use(express.json(), cors(), routes);

app.listen(4000, () => console.log("online in port 4000"));
