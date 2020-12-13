// Importando librerías
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const routes = require('./routes');
const ConectionDB = require('./config/db');
const path = require('path');

// Environment Variables
require('dotenv').config();

// Config & middlewares 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configure Header HTTP
app.use(cors());

// Connected database
ConectionDB.getInstance();

// Routes (endpoints globals)
app.use(routes);

// Variables
const PORT = process.env.PORT || 4000;

// Server config
app.listen(PORT,() => {
  console.log("Server running on port ", PORT);
})