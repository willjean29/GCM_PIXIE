const express = require('express');
const app = express();

// app.use(require)

// endpoints for businness
app.use('/business', require('./business'));

module.exports = app;