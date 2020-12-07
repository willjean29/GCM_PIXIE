/**
 * Agrupa archivos en este caso las rutas para exportarlo en uno solo
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

// endpoints for competitionController
app.use('/competition',require('./competition'));

// endpoints for categories
app.use('/categories',require('./category'));

// endpoints for catalog
app.use('/catalog',require('./catalog'));

// endpoints for prizes
app.use('/prize',require('./prize'));

module.exports = app;