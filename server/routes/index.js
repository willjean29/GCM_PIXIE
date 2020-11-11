/**
 * Agrupa archivos en este caso las rutas para exportarlo en uno solo
 */
const express = require('express');
const app = express();

// app.use(require)

// endpoints for files
app.use('/file', require('./file'));

// endpoints for admin
app.use('/admin', require('./admin'));

module.exports = app;