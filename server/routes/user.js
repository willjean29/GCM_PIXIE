/*
  Rutas de usuario.
*/

// Importando librerías
const express = require('express');
const router = express.Router();
const app = express.Router();

// Importando controladores
const userController = require('../controllers/userController');

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

// Para registrar nuevo cliente
router.post('/register',
  userController.registrarCliente
);

router.put('/',
  userController.actualizarCliente
);

module.exports = router;
