/*
  Rutas de usuario.
*/

// Importando librerías
const express = require('express');
const router = express.Router();
const app = express.Router();

// Importando controladores
const userController = require('../controllers/userController');

// Importando middlewares
const { verifyTokenCliente } = require("../middlewares/verifyToken");

// Para autenticar al cliente
app.post("/login",
  userController.autenticarCliente
);

// Para registrar nuevo cliente
app.post("/register",
  userController.registrarCliente
);

// Para ver la lista de empresas asociadas
app.get(
  "/business_list",
  verifyTokenCliente,
  userController.mostrarListadoEmpresas
);

//  Para ver el catalogo de la empresa
app.get(
  "/business/:id",
  verifyTokenCliente,
  userController.mostrarCatalogoEmpresa
);

// Para ver las categorías del catalogo
app.get(
  "/business/:id/:category",
  verifyTokenCliente,
  userController.mostrarCategoriaCatalogo
);

router.put('/',
  userController.actualizarCliente
);

module.exports = router;
