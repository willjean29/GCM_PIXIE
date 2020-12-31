const express = require("express");
const app = express.Router();
const userController = require("../controllers/userController");

app.post("/login", userController.autenticarCliente);

app.post("/register", userController.registrarCliente);

module.exports = app;
