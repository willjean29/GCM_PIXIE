/*
  Agrupa archivos, en este caso las rutas 
  para exportarlas en una solo.
*/

// Importando librerías
const express = require('express');
const app = express();

// app.use(require)

// endpoints for admin
app.use("/admin", require("./admin"));

// endpoints for businness
app.use("/business", require("./business"));

// endpoints for files
app.use("/file", require("./file"));

// endpoints for competition
app.use('/competition',require('./competition'));

// endpoints for categories
app.use('/categories',require('./category'));

// endpoints for catalog
app.use('/catalog',require('./catalog'));

// endpoints for prizes
app.use('/prize',require('./prize'));

// endpoints for clients
app.use('/clients',require('./client'));

// endpoints for users
app.use('/user',require('./user'));

module.exports = app;
