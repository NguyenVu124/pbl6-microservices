const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", proxy("http://localhost:5001"));
app.use("/supply", proxy("https://gogosuplyservice.herokuapp.com"));
app.use("/payment", proxy("http://localhost:5002"));

app.listen(5000, () => {
  console.log("Gateway is listening on Port 5000");
});
