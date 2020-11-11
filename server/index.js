const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const routes = require('./routes');
const ConectionDB = require('./config/db');
const path = require('path');

// Environment Variables
require('dotenv').config();

// config & middlewares 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configure Header HTTP
app.use(cors());

// connected database
ConectionDB.getInstance();

// routes (endpoints globals)
app.use(routes);

// variables
const PORT = process.env.PORT || 4000;

//  server config
app.listen(PORT, () => {
    console.log("Server running on port ", PORT);
})