const express = require('express');
const app = express();

// app.use(require)

// endpoints for files
app.use('/file',require('./file'));

module.exports = app;