const express = require("express");
const app = express();
const port = 5000;
const routes = require("./src/routes/routes");
const cors = require("cors");

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "50mb" }));
app.use(cors());

//using routes
app.use("/", routes);

//listening on port
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
