/**
 * Rutas de la empresa
 */
const express = require('express');
const router = express.Router();

// Importando controladores
const businessController = require('../controllers/businessController');
const authController = require('../controllers/authController');

const { verifyTokenAdmin } = require('../middlewares/verifyToken');
const { uploadImage } = require('../middlewares/uploadImage');

// Para validar RUC
router.post('/verificar-ruc',
  // authController.adminsitradorAutenticado,
  verifyTokenAdmin,
  businessController.validarRUC
);

// Para registar empresa
router.post('/registrar',
  verifyTokenAdmin,
  businessController.registrarEmpresa
);

// agregar/actualizar avatar de la empresa
router.post('/avatar',
  verifyTokenAdmin,
  uploadImage,
  businessController.agregarAvatarEmpresa
);

module.exports = router;