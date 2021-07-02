const express = require("express");
const app = express();



//Routes
const indexRoutes = require("./routes/index.routes");
app.use(indexRoutes);

module.exports = app;