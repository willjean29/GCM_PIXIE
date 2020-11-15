/*
  Agrupa archivos, en este caso las rutas 
  para exportarlas en una solo.
*/

const express = require('express');
const app = express();

// app.use(require)

// endpoints for admin
app.use('/admin', require('./admin'));

// endpoints for businness
app.use('/business', require('./business'));

// endpoints for files
app.use('/file', require('./file'));

module.exports = app;