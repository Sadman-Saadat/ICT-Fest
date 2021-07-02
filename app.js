const express = require("express");
const app = express();

//Static Resources
app.use(express.static("public"));

//View Engine
app.set("View engine", "ejs"); //emon aro template engine ase



//Routes
const indexRoutes = require("./routes/index.routes");
app.use(indexRoutes);

module.exports = app;