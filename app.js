const express = require("express");
const app = express();

//Static Resources
app.use(express.static("public"));

//View Engine
app.set("View engine", "ejs"); //emon aro template engine ase

//Body Parser
app.use(express.urlencoded({extended:false}));

//Routes
const indexRoutes = require("./routes/index.routes");
const userRoutes = require("./routes/users.routes");
app.use(indexRoutes);
app.use("./views/users", userRoutes);

module.exports = app;