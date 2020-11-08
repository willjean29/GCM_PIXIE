const express = require('express');
const app = express();

// app.use(require)

// endpoints for admin
app.use('/admin', require('./admin'));

// endpoints for businness
app.use('/business', require('./business'));

module.exports = app;