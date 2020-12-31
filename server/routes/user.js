const express = require("express");
const app = express.Router();
const userController = require("../controllers/userController");

const { verifyTokenCliente } = require("../middlewares/verifyToken");

app.post("/login", userController.autenticarCliente);

app.post("/register", userController.registrarCliente);

app.get(
  "/business_list",
  verifyTokenCliente,
  userController.mostrarListadoEmpresas
);

app.get(
  "/business/:id",
  verifyTokenCliente,
  userController.mostrarCatalogoEmpresa
);

app.get(
  "/business/:id/:category",
  verifyTokenCliente,
  userController.mostrarCategoriaCatalogo
);

module.exports = app;
